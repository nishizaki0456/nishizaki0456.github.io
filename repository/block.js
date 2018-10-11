(function(ext) {
    
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    // Functions for block with type 'w' will get a callback function as the 
    // final argument. This should be called to indicate that the block can
    // stop waiting.
    ext.wait_random = function(callback) {
        
        var connection = new WebSocket('ws://192.168.250.110:30002');

        connection.onopen = function () {
            connection.send(toBytes("movej([0,-1.57, 0,"+ str(0) +","+  str(PI/2) + ","+ str(PI/2)+ " ], a=1.39 , v=1.04)" + "\n")); 
        };
        wait = Math.random();
        console.log('Waiting for ' + wait + ' seconds');
        window.setTimeout(function() {
            callback();
        }, wait*1000);
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['w', 'wait for random time', 'wait_random'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Random wait extension', descriptor, ext);
})({});
