# Add project specific ProGuard rules here.

# Keep webview classes
-keep class android.webkit.** { *; }
-keepclassmembers class android.webkit.** { *; }

# Keep app classes
-keep class com.sgac.college.** { *; }

# General Android rules
-keepattributes Signature
-keepattributes *Annotation*
-keepattributes SourceFile,LineNumberTable
