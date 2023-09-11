import Foundation
import ClockKit

@objc(WatchFace)
class WatchFace: NSObject {

  @objc(addWatchFace:withResolver:withRejecter:)
  func addWatchFace(path: NSString, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) -> Void {
      let library = CLKWatchFaceLibrary()
      let srcUrl: URL = URL(fileURLWithPath: "\(path)")

      library.addWatchFace(at: srcUrl) { (error) in
          // Check for error
          if let error = error {
              // Call reject when an error occurs
              reject("event_failure", "An error occurred: \(error.localizedDescription)", error)
          } else {
              // Call resolve when the operation is successful
              resolve(true)
          }
      }
  }
}
