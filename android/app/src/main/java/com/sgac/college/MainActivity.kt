package com.sgac.college

import android.annotation.SuppressLint
import android.content.Intent
import android.graphics.Bitmap
import android.net.Uri
import android.os.Bundle
import android.view.View
import android.webkit.*
import android.widget.FrameLayout
import android.widget.ProgressBar
import android.widget.TextView
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    
    private lateinit var webView: WebView
    private lateinit var progressBar: ProgressBar
    private lateinit var loadingText: TextView
    private lateinit var loadingContainer: FrameLayout
    private val currentUrl = "https://sgac-college-website-dnwi.vercel.app/index.html"
    
    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        webView = findViewById(R.id.webView)
        progressBar = findViewById(R.id.progressBar)
        loadingText = findViewById(R.id.loadingText)
        loadingContainer = findViewById(R.id.loadingContainer)
        
        webView.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            databaseEnabled = true
            cacheMode = WebSettings.LOAD_DEFAULT
            allowFileAccess = true
            allowContentAccess = true
            loadWithOverviewMode = true
            useWideViewPort = true
            builtInZoomControls = true
            displayZoomControls = false
            setSupportZoom(true)
            mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
            setSupportMultipleWindows(false)
            loadWithOverviewMode = true
        }
        
        webView.webViewClient = WebViewClientHandler()
        webView.webChromeClient = ChromeClientHandler()
        
        webView.loadUrl(currentUrl)
    }
    
    inner class WebViewClientHandler : WebViewClient() {
        override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
            val url = request?.url?.toString() ?: return false
            
            return when {
                url.startsWith("tel:") -> {
                    startActivity(Intent(Intent.ACTION_DIAL, Uri.parse(url)))
                    true
                }
                url.startsWith("mailto:") -> {
                    startActivity(Intent(Intent.ACTION_SENDTO, Uri.parse(url)))
                    true
                }
                url.startsWith("https://wa.me") || url.startsWith("whatsapp:") -> {
                    startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(url)))
                    true
                }
                else -> false
            }
        }
        
        override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
            super.onPageStarted(view, url, favicon)
            loadingContainer.visibility = View.VISIBLE
            progressBar.visibility = View.VISIBLE
            loadingText.text = "Loading website..."
        }
        
        override fun onPageFinished(view: WebView?, url: String?) {
            super.onPageFinished(view, url)
            loadingContainer.visibility = View.GONE
        }
        
        override fun onReceivedError(view: WebView?, request: WebResourceRequest?, error: WebResourceError?) {
            super.onReceivedError(view, request, error)
            if (request?.isForMainFrame == true) {
                loadingContainer.visibility = View.GONE
                showErrorDialog()
            }
        }
    }
    
    inner class ChromeClientHandler : WebChromeClient() {
        override fun onProgressChanged(view: WebView?, newProgress: Int) {
            progressBar.progress = newProgress
            loadingText.text = "Loading... $newProgress%"
        }
    }
    
    private fun showErrorDialog() {
        AlertDialog.Builder(this)
            .setTitle("Loading Error")
            .setMessage("Unable to load website. Please check your internet connection and try again.")
            .setPositiveButton("Retry") { _, _ -> webView.loadUrl(currentUrl) }
            .setNegativeButton("Open in Browser") { _, _ ->
                startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(currentUrl)))
            }
            .setCancelable(false)
            .show()
    }
    
    @Deprecated("Deprecated in Java")
    override fun onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack()
        } else {
            super.onBackPressed()
        }
    }
    
    override fun onResume() {
        super.onResume()
        webView.onResume()
    }
    
    override fun onPause() {
        super.onPause()
        webView.onPause()
    }
    
    override fun onDestroy() {
        webView.destroy()
        super.onDestroy()
    }
}
