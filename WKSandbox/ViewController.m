//
//  ViewController.m
//  WKSandbox
//
//  Created by Mac on 19/07/2017.
//
//

#import "ViewController.h"
#import "HTTPServer.h"

@implementation ViewController
{
    HTTPServer *server;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    
    NSString *path = [NSBundle.mainBundle pathForResource:@"html" ofType:nil];
    server = [[HTTPServer alloc] init];
    [server setDocumentRoot:path];
    NSError *error = nil;
    if (![server start:&error]) {
        NSLog(@"Error starting HTTP server: %@", error.localizedDescription);
        return;
    }

    NSString *serverPath = [NSString stringWithFormat:@"http://localhost:%d", server.listeningPort];
    NSLog(@"Running HTTP server: %@", serverPath);

    NSURL *url = [[NSURL alloc] initWithString:serverPath];
    NSURLRequest *request = [[NSURLRequest alloc] initWithURL:url];
    [self.webView loadRequest:request];
    
    [self.webView.configuration.preferences setValue:@YES forKey:@"developerExtrasEnabled"];
    self.webView.UIDelegate = self;
}

- (void)dealloc {
    [server stop];
}

- (void)webView:(WKWebView *)webView runJavaScriptAlertPanelWithMessage:(NSString *)message initiatedByFrame:(WKFrameInfo *)frame completionHandler:(void (^)(void))completionHandler {
    NSLog(@"alert=%@", message);
    completionHandler();
}

@end
