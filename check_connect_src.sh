#!/usr/bin/env bash
# usage: ./check_connect_src.sh https://yourapp/ "'self' https://api.example.com https://telemetry.example.net"
URL="${1:-https://yourapp/}"
ALLOWLIST="${2:-"'self'"}"   # مصادر مسموحة تفصلها بمسافات

# 1) اجمع كل سياسات CSP (لو فيه أكثر من هيدر) في سطر واحد
POLICY="$(curl -sI "$URL" \
  | awk 'BEGIN{IGNORECASE=1}/^content-security-policy/{sub(/^[^:]+:\s*/,"""); print}' \
  | paste -sd '; ' -)"

[ -z "$POLICY" ] && { echo "❌ لا يوجد Content-Security-Policy"; exit 1; }

echo "CSP: $POLICY"

# 2) استخرج connect-src (لو مفيش، هنرجع لـ default-src حسب المواصفة)
CONNECT="$(printf '%s' "$POLICY" | tr ';' '\n' \
  | awk 'BEGIN{IGNORECASE=1}/^\s*connect-src/{print}')"

if [ -z "$CONNECT" ]; then
  DEFAULT="$(printf '%s' "$POLICY" | tr ';' '\n' \
    | awk 'BEGIN{IGNORECASE=1}/^\s*default-src/{print}')"
  if [ -n "$DEFAULT" ]; then
    echo "ℹ️ connect-src غير موجود — المتصفح هيورِّث من default-src حسب المواصفة."
    CONNECT="$DEFAULT"   # نفحص الـ default-src بدل connect-src
  else
    echo "❌ لا connect-src ولا default-src — سياسة غير آمنة."
    exit 1
  fi
fi

echo "CONNECT-LINE: $CONNECT"

# 3) تحذير لو فيه أنماط واسعة: * أو https:/wss: كـ scheme-wide
printf '%s\n' "$CONNECT" \
 | egrep -qi '(^| )\*|(^| )https:($| )|(^| )wss:($| )' \
 && echo "⚠️ BROAD: connect-src واسع (wildcard أو scheme-wide)" \
 || echo "✅ connect-src مشدّد (لا wildcards ولا https:/wss: عامة)"

# 4) طلع المصادر الفعلية وشيّكها مقابل الـ Allowlist
TOKENS="$(printf '%s' "$CONNECT" \
  | sed -E 's/^[[:space:]]*(connect-src|default-src)[[:space:]]+//I')"

UNEXPECTED=0
for s in $TOKENS; do
  case " $ALLOWLIST " in
    *" $s "*) : ;;  # مسموح
    *) 
      # تجاهل الفواصل والنقاط المنقوطة
      case "$s" in ";"|"") : ;; 
      *) echo "⚠️ unexpected source: $s"; UNEXPECTED=1 ;;
      esac
    ;;
  esac
done

[ $UNEXPECTED -eq 0 ] && echo "✅ كل المصادر ضمن الـ Allowlist" || echo "⚠️ راجع القائمة أعلاه"
