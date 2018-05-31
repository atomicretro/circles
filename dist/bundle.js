/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./scripts/game.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./scripts/baddie.js":
/*!***************************!*\
  !*** ./scripts/baddie.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utilities = __webpack_require__(/*! ./utilities */ "./scripts/utilities.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaddiePool = function (_ObjectPool) {
  _inherits(BaddiePool, _ObjectPool);

  function BaddiePool(size, ctx, ImageStore, BulletPool) {
    _classCallCheck(this, BaddiePool);

    var _this = _possibleConstructorReturn(this, (BaddiePool.__proto__ || Object.getPrototypeOf(BaddiePool)).call(this, size, ctx));

    _this.BulletPool = BulletPool;

    for (var i = 0; i < size; i++) {
      var baddie = new Baddie(ctx, 'redDemon', ImageStore);
      _this.pool.push(baddie);
    }
    return _this;
  }

  return BaddiePool;
}(_utilities.ObjectPool);

exports.default = BaddiePool;
;

var Baddie = function () {
  function Baddie(ctx, type, ImageStore) {
    _classCallCheck(this, Baddie);

    this.ctx = ctx;
    this.type = type;
    this.setDefaultValues();
    var storedAsset = ImageStore[type];
    this.width = storedAsset.width;
    this.height = storedAsset.height;
    this.sprite = new _utilities.Sprite(ctx, storedAsset.image, this.width, this.height, storedAsset.srcX, storedAsset.srcY);
  }

  _createClass(Baddie, [{
    key: 'spawn',
    value: function spawn(baddieData) {
      this.theta = baddieData.theta;
      this.drawPoint = this.computeDrawPoint();
      this.speed = baddieData.speed;
      this.spawned = true;
    }
  }, {
    key: 'draw',
    value: function draw(BulletPool) {
      this.clear();
      if (this.isHit) {
        this.clear();
        return true;
      } else {
        this.theta -= this.speed;
        this.drawPoint = this.computeDrawPoint();
        this.sprite.draw(this.drawPoint.x, this.drawPoint.y);

        this.chanceToFire = Math.floor(Math.random() * 101);
        if (this.chanceToFire / 100 < this.fireThreshold) {
          this.fire(BulletPool);
        }
      }
    }
  }, {
    key: 'computeDrawPoint',
    value: function computeDrawPoint() {
      return {
        x: Math.cos(this.theta) * -this.radius + 390,
        y: Math.sin(this.theta) * -this.radius + 232
      };
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.ctx.clearRect(this.drawPoint.x - 5, this.drawPoint.y - 5, this.width + 10, this.height + 10);
    }
  }, {
    key: 'fire',
    value: function fire(BulletPool) {
      var bulletData = {
        theta: this.theta,
        speed: 4,
        radius: this.radius,
        startPoint: {
          x: this.drawPoint.x + this.width / 2,
          y: this.drawPoint.y + this.height / 2
        }
      };
      BulletPool.get(bulletData);
    }
  }, {
    key: 'setDefaultValues',
    value: function setDefaultValues() {
      this.isHit = false;
      this.chanceToFire = 0;
      this.fireThreshold = 0.01;
      this.spawned = false;
      this.drawPoint = { x: 400, y: 250 };
      this.speed = 0.1;
      this.radius = 300; // The 'track' the baddie moves along
    }
  }]);

  return Baddie;
}();

;

/***/ }),

/***/ "./scripts/baddieBullet.js":
/*!*********************************!*\
  !*** ./scripts/baddieBullet.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utilities = __webpack_require__(/*! ./utilities */ "./scripts/utilities.js");

var _bullet = __webpack_require__(/*! ./bullet */ "./scripts/bullet.js");

var _bullet2 = _interopRequireDefault(_bullet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BulletPool = function (_ObjectPool) {
  _inherits(BulletPool, _ObjectPool);

  function BulletPool(size, fgCanvas, type) {
    _classCallCheck(this, BulletPool);

    var _this = _possibleConstructorReturn(this, (BulletPool.__proto__ || Object.getPrototypeOf(BulletPool)).call(this, size));

    for (var i = 0; i < size; i++) {
      var bullet = new BadBullet(fgCanvas, type);
      _this.pool.push(bullet);
    }
    return _this;
  }

  return BulletPool;
}(_utilities.ObjectPool);

exports.default = BulletPool;

var BadBullet = function (_Bullet) {
  _inherits(BadBullet, _Bullet);

  function BadBullet(fgCanvas, type) {
    _classCallCheck(this, BadBullet);

    return _possibleConstructorReturn(this, (BadBullet.__proto__ || Object.getPrototypeOf(BadBullet)).call(this, fgCanvas, type));
  }

  _createClass(BadBullet, [{
    key: 'spawn',
    value: function spawn(bulletData) {
      // debugger
      this.pathAngle = bulletData.theta;
      this.speed = bulletData.speed;
      this.startPoint = this.computePoint(bulletData.radius);
      this.endPoint = this.computePoint(bulletData.radius - 20);
      this.startRadius = bulletData.radius;
      this.endRadius = bulletData.radius - 20;
      this.spawned = true;
    }
  }]);

  return BadBullet;
}(_bullet2.default);

;

// Bullet.prototype = new Sprite();

/***/ }),

/***/ "./scripts/bullet.js":
/*!***************************!*\
  !*** ./scripts/bullet.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bullet = function () {
  function Bullet(fgCanvas, type) {
    _classCallCheck(this, Bullet);

    this.ctx = fgCanvas.ctx;
    this.ctxWidth = fgCanvas.width;
    this.ctxHeight = fgCanvas.height;
    this.undrawX = fgCanvas.width + 5;
    this.undrawY = fgCanvas.height + 5;
    this.setDefaultValues(type);
  }

  _createClass(Bullet, [{
    key: 'draw',
    value: function draw() {
      this.clear();
      this.startRadius -= this.speed;
      this.endRadius -= this.speed;
      this.startPoint = this.computePoint(this.startRadius);
      this.endPoint = this.computePoint(this.endRadius);

      if ((this.startPoint.y > -5 || this.endPoint.y > -5) && (this.startPoint.y < this.undrawY || this.endPoint.y < this.undrawY) && (this.startPoint.x > -5 || this.endPoint.x > -5) && (this.startPoint.x < this.undrawX || this.endPoint.x < this.undrawX)) {
        this.ctx.beginPath();
        this.ctx.lineWidth = 2;
        this.ctx.moveTo(this.startPoint.x, this.startPoint.y);
        this.ctx.lineTo(this.endPoint.x, this.endPoint.y);
        this.ctx.stroke();
      } else {
        return true;
      };
    }
  }, {
    key: 'clear',
    value: function clear() {
      var startX = void 0;
      var startY = void 0;

      if (this.startPoint.x > this.endPoint.x) {
        startX = this.endPoint.x;
      } else {
        startX = this.startPoint.x;
      }
      if (this.startPoint.y > this.endPoint.y) {
        startY = this.endPoint.y;
      } else {
        startY = this.startPoint.y;
      }

      this.ctx.clearRect(startX - 5, startY - 5, 30, 30);
    }
  }, {
    key: 'computePoint',
    value: function computePoint(radius) {
      return {
        x: Math.cos(this.pathAngle) * -radius + this.xOffset,
        y: Math.sin(this.pathAngle) * -radius + this.yOffset
      };
    }
  }, {
    key: 'setDefaultValues',
    value: function setDefaultValues(type) {
      if (type === 'player') {
        this.startRadius = 12;
        this.endRadius = -8;
      }
      this.xOffset = this.ctxWidth / 2;
      this.yOffset = this.ctxHeight / 2;
      this.pathAngle = 0;
      this.startPoint = { x: 0, y: 0 };
      this.endPoint = { x: 0, y: 0 };
      this.speed = 0;
      this.spawned = false;
    }
  }]);

  return Bullet;
}();

exports.default = Bullet;
;

/***/ }),

/***/ "./scripts/field.js":
/*!**************************!*\
  !*** ./scripts/field.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _player = __webpack_require__(/*! ./player */ "./scripts/player.js");

var _player2 = _interopRequireDefault(_player);

var _utilities = __webpack_require__(/*! ./utilities */ "./scripts/utilities.js");

var _baddie = __webpack_require__(/*! ./baddie */ "./scripts/baddie.js");

var _baddie2 = _interopRequireDefault(_baddie);

var _playerBullet = __webpack_require__(/*! ./playerBullet */ "./scripts/playerBullet.js");

var _playerBullet2 = _interopRequireDefault(_playerBullet);

var _baddieBullet = __webpack_require__(/*! ./baddieBullet */ "./scripts/baddieBullet.js");

var _baddieBullet2 = _interopRequireDefault(_baddieBullet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KEY_MAP = {
  74: 'left', // j
  76: 'right', // l
  68: 'right', // d
  65: 'left', // a
  39: 'right', // left arrow
  37: 'left', // right arrow
  32: 'fire' // space bar
};

var KEY_STATUS = {};
for (var code in KEY_MAP) {
  KEY_STATUS[KEY_MAP[code]] = false;
}

var Field = function () {
  function Field(fgCanvas, statsCanvas, pcCanvas, bgCanvas) {
    _classCallCheck(this, Field);

    this.fgCanvas = {
      ctx: fgCanvas.getContext("2d"),
      width: 800,
      height: 500
    };
    this.statsCanvas = {
      ctx: statsCanvas.getContext("2d"),
      width: 800,
      height: 25
    };
    this.pcCanvas = {
      ctx: pcCanvas.getContext("2d"),
      width: 150,
      height: 150
    };
    this.bgCanvas = {
      ctx: bgCanvas.getContext("2d"),
      width: 800,
      height: 500
    };

    this.ImageStore = new _utilities.ImageStore(this);
    this.badBulletPool = new _baddieBullet2.default(1, this.fgCanvas, 'demonBullet');
    this.pcBulletPool = new _playerBullet2.default(8, this.fgCanvas);
    this.BaddiePool = new _baddie2.default(1, this.fgCanvas.ctx, this.ImageStore, this.badBulletPool);
    this.player = new _player2.default(this.pcCanvas, this.pcBulletPool);
    this.lastTime = Date.now;

    this.playerScore = 0;
    this.heart = new _utilities.Sprite(this.statsCanvas.ctx, this.ImageStore.heart.image, 13, 13, 0, 0);

    this.startRound = this.startRound.bind(this);
    this.playRound = this.playRound.bind(this);
    this.checkCollisions = this.checkCollisions.bind(this);
    // this.checkPlayerCollision = this.checkPlayerCollision.bind(this);

    document.addEventListener('keydown', this.keydown.bind(this));
    document.addEventListener('keyup', this.keyup.bind(this));
  }

  _createClass(Field, [{
    key: 'startRound',
    value: function startRound() {
      this.drawStatusBar();
      this.playRound();
    }
  }, {
    key: 'playRound',
    value: function playRound() {
      // let now = Date.now();
      // let dt = (now - this.lastTime) / 1000.0;

      // update(dt);
      // this.drawStatusBar();
      this.render();

      // this.lastTime = now;
      requestAnimationFrame(this.playRound);
    }
  }, {
    key: 'render',
    value: function render() {
      this.clearFGContext();
      // this.drawBackground();
      this.clearPCContext();
      this.updatePlayerCharge();
      this.drawPlayerRails('circle');
      this.checkCollisions();
      this.drawPlayer();
      this.BaddiePool.get({ theta: Math.PI / 2, speed: 0.005 });
      this.BaddiePool.draw();
      this.pcBulletPool.draw('player');
      this.badBulletPool.draw();
    }
  }, {
    key: 'drawBackground',
    value: function drawBackground() {
      // debugger
      var bg1 = new _utilities.Sprite(this.bgCanvas.ctx, this.ImageStore.backgroundSky.image, 0, 0, 100, 100);
      bg1.draw(0, 0);
    }
  }, {
    key: 'keydown',
    value: function keydown(e) {
      var keyCode = e.which || e.keyCode || 0;
      if (KEY_MAP[keyCode]) {
        e.preventDefault();
        KEY_STATUS[KEY_MAP[keyCode]] = true;
      }
    }
  }, {
    key: 'keyup',
    value: function keyup(e) {
      var keyCode = e.which || e.keyCode || 0;
      if (KEY_MAP[keyCode]) {
        e.preventDefault();
        KEY_STATUS[KEY_MAP[keyCode]] = false;
      }
    }
  }, {
    key: 'drawStatusBar',
    value: function drawStatusBar() {
      this.statsCanvas.ctx.fillStyle = 'white';
      this.statsCanvas.ctx.fillRect(0, 0, this.statsCanvas.width, this.statsCanvas.height);

      this.statsCanvas.ctx.fillStyle = 'black';
      this.statsCanvas.ctx.font = "16px Arial";
      this.statsCanvas.ctx.fillText("0", 100, 19);

      this.drawPlayerHearts();

      this.statsCanvas.ctx.strokeStyle = 'blue';
      this.statsCanvas.ctx.strokeRect(634, 6, 98, 13);
    }
  }, {
    key: 'drawPlayerHearts',
    value: function drawPlayerHearts() {
      this.statsCanvas.ctx.clearRect(399, 5, 200, 20);
      for (var i = 0; i < this.player.life; i++) {
        this.heart.draw(400 + i * 20, 6);
      }
    }
  }, {
    key: 'updatePlayerScore',
    value: function updatePlayerScore() {
      this.playerScore += 100;
      this.statsCanvas.ctx.clearRect(99, 5, 200, 20);
      this.statsCanvas.ctx.fillStyle = 'black';
      this.statsCanvas.ctx.font = "16px Arial";
      this.statsCanvas.ctx.fillText('' + this.playerScore, 100, 19);
    }
  }, {
    key: 'updatePlayerCharge',
    value: function updatePlayerCharge() {
      if (this.player.fireCharge === 0) {
        this.statsCanvas.ctx.clearRect(635, 7, 96, 11);
      } else if (this.player.fireCharge < 25) {
        this.statsCanvas.ctx.fillStyle = 'blue';
        this.statsCanvas.ctx.fillRect(635, 7, this.player.fireCharge * 4, 11);
      }
    }
  }, {
    key: 'drawPlayerRails',
    value: function drawPlayerRails(shape) {
      var xCenter = this.pcCanvas.width / 2;
      var yCenter = this.pcCanvas.height / 2;

      switch (shape) {
        case 'circle':
        default:
          this.pcCanvas.ctx.beginPath();
          this.pcCanvas.ctx.arc(xCenter, yCenter, 60, 0, 2 * Math.PI, true);
          this.pcCanvas.ctx.strokeStyle = "black";
          this.pcCanvas.ctx.lineWidth = 2;
          this.pcCanvas.ctx.stroke();
      }
    }
  }, {
    key: 'drawPlayer',
    value: function drawPlayer() {
      this.player.move(KEY_STATUS);
      this.player.draw();
    }
  }, {
    key: 'checkCollisions',
    value: function checkCollisions() {
      var spawnedPCBullets = this.pcBulletPool.pool.filter(function (bullet) {
        return bullet.spawned;
      });
      this.checkPlayerCollision(spawnedPCBullets);
      this.checkBaddieCollision(spawnedPCBullets);
    }
  }, {
    key: 'checkPlayerCollision',
    value: function checkPlayerCollision(spawnedPCBullets) {
      var spawnedBadBullets = this.badBulletPool.pool.filter(function (bullet) {
        return bullet.spawned;
      });

      var hitbox = {
        x: this.player.hitboxCenter.x,
        y: this.player.hitboxCenter.y,
        radius: 12
      };

      for (var bullIdx = 0; bullIdx < spawnedPCBullets.length; bullIdx++) {
        var bullet = spawnedPCBullets[bullIdx];
        if ((this.bulletHitsPC(this.player, hitbox, bullet.startPoint) || this.bulletHitsPC(this.player, hitbox, bullet.endPoint)) && this.player.invincibilityFrames < 50) {
          this.player.isHit();
        };
      }

      for (var _bullIdx = 0; _bullIdx < spawnedBadBullets.length; _bullIdx++) {
        var _bullet = spawnedBadBullets[_bullIdx];
        if ((this.bulletHitsPC(this.player, hitbox, _bullet.startPoint) || this.bulletHitsPC(this.player, hitbox, _bullet.endPoint)) && this.player.invincibilityFrames > 50) {
          this.player.isHit();
          this.drawPlayerHearts();
        };
      }
    }
  }, {
    key: 'bulletHitsPC',
    value: function bulletHitsPC(player, hitbox, bullet) {
      hitbox.x = hitbox.x - player.pcFieldWidth / 2 + this.fgCanvas.width / 2;
      hitbox.y = hitbox.y - player.pcFieldHeight / 2 + this.fgCanvas.height / 2;
      var distanceFromHitboxToBullet = Math.sqrt(Math.pow(hitbox.x - bullet.x, 2) + Math.pow(hitbox.y - bullet.y, 2));

      return distanceFromHitboxToBullet <= hitbox.radius;
    }
  }, {
    key: 'checkBaddieCollision',
    value: function checkBaddieCollision(spawnedPCBullets) {
      var spawnedBaddies = this.BaddiePool.pool.filter(function (baddie) {
        return baddie.spawned;
      });

      for (var badIdx = 0; badIdx < spawnedBaddies.length; badIdx++) {
        var baddie = spawnedBaddies[badIdx];
        for (var bullIdx = 0; bullIdx < spawnedPCBullets.length; bullIdx++) {
          var bullet = spawnedPCBullets[bullIdx];
          var drawPoint = baddie.drawPoint;
          if (this.pcBulletHitsBaddie(baddie, drawPoint, bullet.startPoint) || this.pcBulletHitsBaddie(baddie, drawPoint, bullet.endPoint)) {
            this.updatePlayerScore();
            baddie.isHit = true;
          };
        }
      }
    }
  }, {
    key: 'pcBulletHitsBaddie',
    value: function pcBulletHitsBaddie(baddie, drawPoint, bullet) {
      return drawPoint.x <= bullet.x && bullet.x <= drawPoint.x + baddie.width && drawPoint.y <= bullet.y && bullet.y <= drawPoint.y + baddie.height;
    }
  }, {
    key: 'clearFGContext',
    value: function clearFGContext() {
      this.fgCanvas.ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
      this.fgCanvas.ctx.fillRect(0, 0, 800, 500);
      // this.fgCanvas.ctx.clearRect(0, 0, this.fgCanvas.width, this.fgCanvas.height);
    } // implement dirty rectangles on each sprite?

  }, {
    key: 'clearPCContext',
    value: function clearPCContext() {
      this.pcCanvas.ctx.clearRect(0, 0, this.pcCanvas.width, this.pcCanvas.height);
    } // implement dirty rectangles on each sprite?

  }]);

  return Field;
}();

exports.default = Field;

/***/ }),

/***/ "./scripts/game.js":
/*!*************************!*\
  !*** ./scripts/game.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _field = __webpack_require__(/*! ./field */ "./scripts/field.js");

var _field2 = _interopRequireDefault(_field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var startGame = function startGame(foregroundCanvas, playerCanvas, statsCanvas, backgroundCanvas) {
  var field = new _field2.default(foregroundCanvas, statsCanvas, playerCanvas, backgroundCanvas);
};

document.addEventListener("DOMContentLoaded", function () {
  var foregroundCanvas = document.getElementById("foregroundCanvas");
  var playerCanvas = document.getElementById("playerCanvas");
  var statsCanvas = document.getElementById("statsCanvas");
  var backgroundCanvas = document.getElementById("backgroundCanvas");
  startGame(foregroundCanvas, playerCanvas, statsCanvas, backgroundCanvas);
});

/***/ }),

/***/ "./scripts/player.js":
/*!***************************!*\
  !*** ./scripts/player.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
  function Player(pcCanvas, BulletPool) {
    _classCallCheck(this, Player);

    this.ctx = pcCanvas.ctx;
    this.pcFieldWidth = pcCanvas.width;
    this.pcFieldHeight = pcCanvas.height;
    this.BulletPool = BulletPool;

    this.velocity = 0;
    this.acceleration = 0.02;
    this.maxSpeed = 0.3;
    this.radius = 50; // The 'track' the player moves along
    this.fireCharge = 0;
    this.fireCooldown = 25;
    this.invincibilityFrames = 50;
    this.life = 3;

    this.portTheta = -1.23;
    this.starboardTheta = 1.9106;
    this.bowTheta = Math.PI / 2;
    this.computeAllVerticies();

    this.draw = this.draw.bind(this);
    this.fire = this.fire.bind(this);
  }

  _createClass(Player, [{
    key: 'computeAllVerticies',
    value: function computeAllVerticies() {
      this.portVertex = this.computePortVertex();
      this.starboardVertex = this.computeStarboardVertex();
      this.bowVertex = this.computeCenterPoints(-15);
      this.hitboxCenter = this.computeCenterPoints(-35);
    }
  }, {
    key: 'computeStarboardVertex',
    value: function computeStarboardVertex() {
      return {
        x: Math.cos(this.starboardTheta) * this.radius + this.pcFieldWidth / 2,
        y: -Math.sin(this.starboardTheta) * this.radius + this.pcFieldHeight / 2
      };
    }
  }, {
    key: 'computePortVertex',
    value: function computePortVertex() {
      return {
        x: Math.cos(this.portTheta) * this.radius + this.pcFieldWidth / 2,
        y: Math.sin(this.portTheta) * this.radius + this.pcFieldHeight / 2
      };
    }
  }, {
    key: 'computeCenterPoints',
    value: function computeCenterPoints(radius) {
      return {
        x: Math.cos(this.bowTheta) * radius + this.pcFieldWidth / 2,
        y: Math.sin(this.bowTheta) * radius + this.pcFieldHeight / 2
      };
    }
  }, {
    key: 'move',
    value: function move(keyStatus) {
      this.fireCharge++; // increments once every frame
      this.invincibilityFrames++; // increments once every frame
      if (keyStatus.left) {
        if (this.velocity <= this.maxSpeed) this.velocity += this.acceleration;
        this.starboardTheta += this.velocity;
        this.portTheta -= this.velocity;
        this.bowTheta -= this.velocity;
      } else if (keyStatus.right) {
        if (this.velocity <= this.maxSpeed) this.velocity += this.acceleration;
        this.starboardTheta -= this.velocity;
        this.portTheta += this.velocity;
        this.bowTheta += this.velocity;
      } else {
        this.velocity = 0;
      }

      if (keyStatus.fire && this.fireCharge >= this.fireCooldown) this.fire();
    }
  }, {
    key: 'fire',
    value: function fire() {
      this.fireCharge = 0;
      var bulletData = {
        theta: this.bowTheta,
        speed: 4
      };
      this.BulletPool.get(bulletData);
    }
  }, {
    key: 'draw',
    value: function draw() {
      this.computeAllVerticies();

      this.ctx.beginPath();

      if (this.invincibilityFrames < 50) {
        this.ctx.fillStyle = 'red';
      } else {
        this.ctx.fillStyle = 'black';
      }

      this.ctx.moveTo(this.starboardVertex.x, this.starboardVertex.y);
      this.ctx.lineTo(this.portVertex.x, this.portVertex.y);
      this.ctx.lineTo(this.bowVertex.x, this.bowVertex.y);
      this.ctx.fill();
    }
  }, {
    key: 'isHit',
    value: function isHit() {
      this.life -= 1;
      this.invincibilityFrames = 0;
    }
  }]);

  return Player;
}();

exports.default = Player;

/***/ }),

/***/ "./scripts/playerBullet.js":
/*!*********************************!*\
  !*** ./scripts/playerBullet.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utilities = __webpack_require__(/*! ./utilities */ "./scripts/utilities.js");

var _bullet = __webpack_require__(/*! ./bullet */ "./scripts/bullet.js");

var _bullet2 = _interopRequireDefault(_bullet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BulletPool = function (_ObjectPool) {
  _inherits(BulletPool, _ObjectPool);

  function BulletPool(size, fgCanvas) {
    _classCallCheck(this, BulletPool);

    var _this = _possibleConstructorReturn(this, (BulletPool.__proto__ || Object.getPrototypeOf(BulletPool)).call(this, size));

    for (var i = 0; i < size; i++) {
      var bullet = new PlayerBullet(fgCanvas);
      _this.pool.push(bullet);
    }
    return _this;
  }

  return BulletPool;
}(_utilities.ObjectPool);

exports.default = BulletPool;
;

var PlayerBullet = function (_Bullet) {
  _inherits(PlayerBullet, _Bullet);

  function PlayerBullet(fgCanvas) {
    _classCallCheck(this, PlayerBullet);

    return _possibleConstructorReturn(this, (PlayerBullet.__proto__ || Object.getPrototypeOf(PlayerBullet)).call(this, fgCanvas, 'player'));
  }

  _createClass(PlayerBullet, [{
    key: 'spawn',
    value: function spawn(bulletData) {
      this.pathAngle = bulletData.theta;
      this.startPoint = this.computePoint(this.startRadius);
      this.endPoint = this.computePoint(this.endRadius);
      this.speed = bulletData.speed;
      this.spawned = true;
    }
  }]);

  return PlayerBullet;
}(_bullet2.default);

;

/***/ }),

/***/ "./scripts/utilities.js":
/*!******************************!*\
  !*** ./scripts/utilities.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ObjectPool = exports.ObjectPool = function () {
  function ObjectPool(size) {
    _classCallCheck(this, ObjectPool);

    this.size = size;
    this.pool = [];
  }

  _createClass(ObjectPool, [{
    key: 'get',
    value: function get(objectData) {
      if (!this.pool[this.size - 1].spawned) {
        this.pool[this.size - 1].spawn(objectData);
        this.pool.unshift(this.pool.pop());
      }
    }
  }, {
    key: 'draw',
    value: function draw(type) {
      for (var i = 0; i < this.size; i++) {
        if (this.pool[i].spawned) {
          if (this.pool[i].draw(this.BulletPool)) {
            this.pool[i].setDefaultValues(type);
            this.pool.push(this.pool.splice(i, 1)[0]);
          }
        } else {
          break;
        }
      }
    }
  }]);

  return ObjectPool;
}();

;

var Sprite = exports.Sprite = function () {
  function Sprite(context, image, srcWidth, srcHeight, srcX, srcY) {
    _classCallCheck(this, Sprite);

    this.context = context;
    this.image = image;
    this.srcX = srcX;
    this.srcY = srcY;
    this.srcWidth = srcWidth;
    this.srcHeight = srcHeight;

    this.draw = this.draw.bind(this);
  }

  _createClass(Sprite, [{
    key: 'draw',
    value: function draw(drawPointX, drawPointY) {
      this.context.drawImage(this.image, this.srcX, this.srcY, this.srcWidth, this.srcHeight, drawPointX, drawPointY, this.srcWidth, // drawn image width, same as src
      this.srcHeight // drawn image height, same as src
      );
    }
  }]);

  return Sprite;
}();

var ImageStore = exports.ImageStore = function () {
  function ImageStore(field) {
    var _this = this;

    _classCallCheck(this, ImageStore);

    this.field = field;
    this.backgroundSky = { image: new Image() };
    this.backgroundCity = { image: new Image() };
    this.bullet = { image: new Image() };
    this.redDemon = {
      image: new Image(),
      width: 21,
      height: 30,
      srcX: 0,
      srcY: 0
    };
    this.heart = { image: new Image() };
    this.numImages = 3;
    this.numLoaded = 0;
    this.ready = false;

    this.backgroundSky.image.onload = function () {
      _this.imageLoaded();
    };
    this.backgroundCity.image.onload = function () {
      _this.imageLoaded();
    };
    this.bullet.image.onload = function () {
      _this.imageLoaded();
    };
    this.redDemon.image.onload = function () {
      _this.imageLoaded();
    };
    this.heart.image.onload = function () {
      _this.imageLoaded();
    };

    this.backgroundSky = 'assets/sprites/sky.png';
    this.backgroundCity = 'assets/sprites/city_background.png';
    this.bullet.image.src = 'assets/sprites/bullet.png';
    this.redDemon.image.src = 'assets/sprites/demon_test.png';
    this.heart.image.src = 'assets/sprites/heart.png';
  }

  _createClass(ImageStore, [{
    key: 'imageLoaded',
    value: function imageLoaded() {
      this.numLoaded++;
      if (this.numLoaded === this.numImages) this.field.startRound();
    }
  }]);

  return ImageStore;
}();

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map