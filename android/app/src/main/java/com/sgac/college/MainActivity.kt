package com.sgac.college

import android.annotation.SuppressLint
import android.app.ProgressDialog
import android.content.Intent
import android.graphics.Bitmap
import android.net.Uri
import android.os.Bundle
import android.view.View
import android.webkit.*
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout

class MainActivity : AppCompatActivity() {
    
    private lateinit var webView: WebView
    private lateinit var swipeRefreshLayout: SwipeRefreshLayout
    private lateinit var progressDialog: ProgressDialog
    private var currentUrl: String = "https://sgac-college-website-dnwi.vercel.app/"
    
    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        webView = findViewById(R.id.webView)
        swipeRefreshLayout = findViewById(R.id.swipeRefreshLayout)
        
        progressDialog = ProgressDialog(this).apply {
            setMessage("Loading...")
            setCancelable(false)
            show()
        }
        
        webView.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            allowFileAccess = true
            allowContentAccess = true
            loadWithOverviewMode = true
            useWideViewPort = true
            builtInZoomControls = true
            displayZoomControls = false
            setSupportZoom(true)
            databaseEnabled = true
            cacheMode = WebSettings.LOAD_DEFAULT
            mixedContentMode = WebSettings.MIXED_CONTENT_COMPATIBILITY_MODE
            setSupportMultipleWindows(false)
        }
        
        webView.webViewClient = WebViewClientHandler()
        webView.webChromeClient = ChromeClientHandler()
        
        swipeRefreshLayout.setColorSchemeResources(
            android.R.color.holo_blue_bright,
            android.R.color.holo_green_light,
            android.R.color.holo_orange_light,
            android.R.color.holo_red_light
        )
        swipeRefreshLayout.setOnRefreshListener {
            webView.reload()
        }
        
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
                url.startsWith("whatsapp:") -> {
                    startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(url)))
                    true
                }
                url.contains("vercel.app") || url.contains("sgacrmd.edu.in") -> {
                    false
                }
                else -> {
                    try {
                        startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(url)))
                    } catch (e: Exception) {
                        Toast.makeText(this@MainActivity, "Cannot open link", Toast.LENGTH_SHORT).show()
                    }
                    true
                }
            }
        }
        
        override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
            super.onPageStarted(view, url, favicon)
            if (!swipeRefreshLayout.isRefreshing) {
                progressDialog.show()
            }
        }
        
        override fun onPageFinished(view: WebView?, url: String?) {
            super.onPageFinished(view, url)
            progressDialog.dismiss()
            swipeRefreshLayout.isRefreshing = false
        }
        
        override fun onReceivedError(view: WebView?, request: WebResourceRequest?, error: WebResourceError?) {
            super.onReceivedError(view, request, error)
            if (request?.isForMainFrame == true) {
                swipeRefreshLayout.isRefreshing = false
            }
        }
    }
    
    inner class ChromeClientHandler : WebChromeClient() {
        override fun onProgressChanged(view: WebView?, newProgress: Int) {
            super.onProgressChanged(view, newProgress)
            if (newProgress < 100 && !progressDialog.isShowing) {
                progressDialog.show()
            } else if (newProgress == 100) {
                progressDialog.dismiss()
            }
        }
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
        if (progressDialog.isShowing) {
            progressDialog.dismiss()
        }
        super.onDestroy()
    }
}
