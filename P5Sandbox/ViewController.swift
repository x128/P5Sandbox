//
//  ViewController.swift
//  P5Sandbox
//
//  Created by Dmitry on 15/07/2017.
//  Copyright © 2017 Dmitry. All rights reserved.
//

import Cocoa
import WebKit

class ViewController: NSViewController {
    @IBOutlet var webView: WKWebView!
    
    let server = HttpServer()
    
    override func viewDidLoad() {
        super.viewDidLoad()

        startServer()
        loadGame()

        webView.configuration.preferences.setValue(true, forKey: "developerExtrasEnabled")
    }
    
    func startServer() {
        if let htmlPath = Bundle.main.path(forResource: "html", ofType: nil) {
            server["/game/:path"] = shareFilesFromDirectory(htmlPath)
            try? server.start()
        }
    }
    
    func loadGame() {
        if let port = try? server.port() {
            if let url = URL(string: "http://localhost:\(port)/game/index.html") {
                let request = URLRequest(url: url)
                webView.load(request)
            }
        }
    }
    
    override var representedObject: Any? {
        didSet {
            // Update the view, if already loaded.
        }
    }
}
