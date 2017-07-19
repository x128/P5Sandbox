//
//  ViewController.h
//  WKSandbox
//
//  Created by Mac on 19/07/2017.
//
//

#import <Cocoa/Cocoa.h>
@import WebKit;

@interface ViewController : NSViewController <WKUIDelegate>

@property (nonatomic, retain) IBOutlet WKWebView *webView;

@end

