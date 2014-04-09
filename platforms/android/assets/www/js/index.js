var game = {
    stage: null,
    queue: null,
    init: function () {
        game.queue = new createjs.LoadQueue(false);
        game.queue.installPlugin(createjs.Sound);
        game.queue.addEventListener("complete", game.loadComplete);
        game.queue.addEventListener("progress", game.handlePreloadProgress);

        game.queue.loadManifest([
            {id: "butterfly", src: "img/logo.png"},
            {id: "chime", src: "snd/dot.mp3"},
            {id: "woosh", src: "snd/doop.mp3"}
        ]);
    },
    loadComplete: function () {
        game.setupStage();
        game.doTask();
    },
    setupStage: function () {
        game.stage = new createjs.Stage(document.getElementById('GameCanvas'));
        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", function () {
            game.stage.update();
        });
    },
    doTask: function () {
        var img = game.queue.getResult("butterfly");
        var i, sound, butterfly;
        for (i = 0; i < 3; i++) {
            butterfly = new createjs.Bitmap(img);
            butterfly.x = i * 200;
            game.stage.addChild(butterfly);
            createjs.Tween.get(butterfly).wait(i * 1000).to({y: 100}, 1000,
                createjs.Ease.quadOut);
            sound = createjs.Sound.play('woosh', createjs.Sound.INTERRUPT_NONE, i * 1000);
        }
    },
    handlePreloadProgress: function(event){
        var progressBar  = document.getElementById("bootProgress");
        var progress = (Math.ceil(event.progress*100)).toString();

        progressBar.setAttribute('style','width: ' + progress + '%');
    }

};



var app = {
    // Application Constructor
    initialize: function () {
        game.init();
        //this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
