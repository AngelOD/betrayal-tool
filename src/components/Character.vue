<template>
  <div class="container" :id="uuid" :ref="uuid">
    <div class="row justify-content-center">
      <vue-p5
        @draw="draw"
        @preload="preload"
        @setup="setup"
        @mousereleased="mouseReleased"
      />
    </div>
  </div>
</template>

<script>
import VueP5 from 'vue-p5';
import moment from 'moment';
import { characters as CharList, regularMeasures, verticalMeasures } from '../characters';
import { Directions, States } from '../constants';

let uuid = 1;

export default {
  name: 'betrayal-character',

  components: {
    'vue-p5': VueP5,
  },

  props: {
    cid: {
      type: Number,
      default: -1,
    },
    vertical: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      arrows: {
        height: 40,
        margin: 10,
        thickness: 5,
        width: 25,
      },
      bgImg: null,
      buttonCoords: [],
      char: null,
      charData: {
        knowledge: 0,
        might: 0,
        sanity: 0,
        speed: 0,
      },
      colors: {
        bg: 0,
        fontFill: 255,
        fontStroke: 0,
        circle: 'magenta',
      },
      currentState: States.STATE_INIT,
      hasError: false,
      height: 400,
      lastFps: 0,
      lastFpsUpdate: 0,
      markerArrows: [],
      markerArrowData: {
        height: 15,
        padding: 5,
        thickness: 4,
        width: 20,
      },
      maxCid: 1,
      minCid: 12,
      statKeys: ['knowledge', 'might', 'sanity', 'speed'],
      tmpInfo: '',
      width: 400,
    };
  },

  computed: {},

  watch: {},

  beforeCreate() {
    this.uuid = `tbchar${uuid}`;
    uuid += 1;
  },

  created() {},

  mounted() {
    const elem = this.$refs[this.uuid];

    if (elem.clientWidth < 400) {
      this.width = elem.clientWidth;
    }
  },

  beforeDestroy() {},

  destroyed() {},

  methods: {
    /**
     *
     */
    preload(sk) {
      const charsDir = (this.vertical ? 'chars_vert' : 'chars');

      this.findMinMaxCid();

      if (this.cid === -1) {
        this.bgImg = sk.loadImage('/assets/menu.png');
        this.currentState = States.STATE_CHARSELECT;
        return;
      }

      this.char = this.getCharacterById(this.cid);

      if (!this.char) {
        this.currentState = States.STATE_ERROR;
      } else {
        this.bgImg = sk.loadImage(`/assets/${charsDir}/${this.char.image.name}`);
        this.currentState = States.STATE_MAIN;
      }
    },

    /**
     *
     */
    setup(sk) {
      if (this.currentState !== States.STATE_ERROR) {
        this.bgImg.resize(this.width, 0);
        this.height = this.bgImg.height;

        if (this.currentState === States.STATE_MAIN) {
          this.preProcessData(sk);
        }
      }

      sk.createCanvas(this.width, this.height);
    },

    /**
     *
     */
    draw(sk) {
      switch (this.currentState) {
        case States.STATE_MAIN:
          this.drawMain(sk);
          break;

        case States.STATE_CHARSELECT:
          this.drawCharSelect(sk);
          break;

        case States.STATE_ERROR:
        default:
          this.drawError(sk);
          break;
      }
    },

    /**
     *
     */
    drawMain(sk) {
      const ch = this.char;
      const chData = this.charData;
      const chImg = ch.image;
      const { colors } = this;
      const isVertical = this.vertical;
      const now = Date.now();
      const textTopOffset = sk.floor(this.height / 12) - 5;

      if (now >= this.lastFpsUpdate + 250) {
        this.lastFps = sk.round(sk.frameRate());
        this.lastFpsUpdate = now;
      }

      // Background
      sk.background(colors.bg);
      sk.image(this.bgImg, 0, 0);

      // Text information
      sk.textSize(14);
      sk.textAlign(sk.RIGHT, sk.TOP);
      sk.stroke(colors.fontStroke);
      sk.fill(colors.fontFill);
      sk.strokeWeight(1);
      sk.text(`${this.lastFps}`, sk.width - 5, textTopOffset);

      sk.textAlign(sk.LEFT, sk.TOP);
      sk.text(`${this.char.daysTillBirthday} days`, 5, textTopOffset);

      // Browse-arrows
      const middlePos = sk.height / 2;

      if (this.cid > this.minCid) {
        this.drawArrow(
          sk,
          Directions.LEFT,
          this.arrows.margin,
          middlePos,
          this.arrows.width,
          this.arrows.height,
          this.arrows.thickness,
        );
      }

      if (this.cid < this.maxCid) {
        this.drawArrow(
          sk,
          Directions.RIGHT,
          sk.width - this.arrows.margin,
          middlePos,
          this.arrows.width,
          this.arrows.height,
          this.arrows.thickness,
        );
      }

      // Marker arrows
      sk.fill('red');
      sk.stroke('red');
      sk.strokeWeight(1);

      this.markerArrows.forEach((arrow) => {
        this.drawArrow(sk, ...arrow);
      });

      // Marker positions
      sk.noFill();
      sk.stroke(colors.circle);
      sk.strokeWeight(2);

      this.statKeys.forEach((key) => {
        let x;
        let y;
        let r;

        if (isVertical) {
          x = verticalMeasures[key];
          y = verticalMeasures.yValues[chData[key]];
          r = (chData[key] > 0 ? 20 : 30);
        } else {
          x = chImg[key].xPositions[chData[key]];
          y = chImg[key].getY(x);
          r = 15;
        }

        sk.ellipse(x, y, r);
      });
    },

    /**
     *
     */
    drawCharSelect(sk) {
      sk.background(this.colors.bg);
      sk.image(this.bgImg, 0, 0);
    },

    /**
     *
     */
    drawError(sk) {
      sk.background(255);
      sk.textSize(32);
      sk.textAlign(sk.CENTER, sk.MIDDLE);
      sk.stroke('red');
      sk.fill('red');
      sk.strokeWeight(1);
      sk.text('ERROR!', sk.width / 2, sk.height / 2);
    },

    /**
     *
     */
    drawArrow(sk, direction, xPos, yPos, width, height, thickness) {
      const halfHeight = height / 2;
      const halfWidth = width / 2;
      const coords = [[xPos, yPos]];
      const isVertical = direction === Directions.LEFT || direction === Directions.RIGHT;
      const multiplier = (direction === Directions.DOWN || direction === Directions.RIGHT ? -1 : 1);

      if (isVertical) {
        coords.push(...[
          [xPos + ((width - thickness) * multiplier), yPos - halfHeight],
          [xPos + (width * multiplier), yPos - halfHeight],
          [xPos + (thickness * multiplier), yPos],
          [xPos + (width * multiplier), yPos + halfHeight],
          [xPos + ((width - thickness) * multiplier), yPos + halfHeight],
        ]);
      } else {
        coords.push(...[
          [xPos - halfWidth, yPos + ((height + thickness) * multiplier)],
          [xPos - halfWidth, yPos + (height * multiplier)],
          [xPos, yPos + (thickness * multiplier)],
          [xPos + halfWidth, yPos + (height * multiplier)],
          [xPos + halfWidth, yPos + ((height + thickness) * multiplier)],
        ]);
      }

      sk.beginShape();
      coords.forEach((coord) => {
        sk.vertex(coord[0], coord[1]);
      });
      sk.endShape(sk.CLOSE);
    },

    /**
     *
     */
    mouseReleased(sk) {
      const mX = sk.mouseX;
      const mY = sk.mouseY;

      switch (this.currentState) {
        case States.STATE_CHARSELECT:
          this.onClickCharSelector(sk, sk.floor(mY / (this.height / 12)) + 1);
          break;

        case States.STATE_MAIN:
        default:
          this.buttonCoords.forEach((coord) => {
            if (mX >= coord.x1 && mX <= coord.x2 && mY >= coord.y1 && mY <= coord.y2) {
              coord.onClick();
            }
          });
      }

      return false;
    },

    /**
     *
     */
    findMinMaxCid() {
      let minCid = -1;
      let maxCid = -1;

      CharList.forEach((elem) => {
        if (minCid === -1 || elem.cid < minCid) {
          minCid = elem.cid;
        }

        if (maxCid === -1 || elem.cid > maxCid) {
          maxCid = elem.cid;
        }
      });

      this.maxCid = maxCid;
      this.minCid = minCid;
    },

    /**
     *
     */
    getCharacterById(cid) {
      const sCid = parseInt(cid, 10);
      return CharList.find(elem => elem.cid === sCid);
    },

    /**
     *
     */
    getUrl(cid) {
      const loc = window.location;
      const u = `${loc.origin}${loc.pathname}${loc.hash}?cid=${cid}&vertical=${this.vertical}`;

      return u;
    },

    /**
     *
     */
    navigateTo(sk, cid) {
      const newCid = sk.constrain(cid, this.minCid, this.maxCid);
      const newUrl = this.getUrl(newCid);

      window.location.replace(newUrl);
    },

    /**
     *
     */
    preProcessData(sk) {
      if (this.char.isProcessed) { return; }

      const { height, width } = this;
      const keys = this.statKeys;
      const chData = this.charData;
      const chImg = this.char.image;
      const segCount = 8;
      const isVertical = this.vertical;
      const markerArrowWidth = this.markerArrowData.width;
      const markerArrowHeight = this.markerArrowData.height;
      const markerArrowPadding = this.markerArrowData.padding;
      const markerArrowThickness = this.markerArrowData.thickness;
      const halfMarkerArrowWidth = markerArrowWidth / 2;
      const { getUrl, onClickArrow, onClickStatButton } = this;

      // Find number of days till next birthday
      const now = moment()
        .hour(0)
        .minute(0)
        .second(0)
        .millisecond(0);
      const birthday = moment()
        .month(this.char.birthday.m - 1)
        .date(this.char.birthday.d)
        .hour(23)
        .minute(59)
        .second(59);

      if (birthday.isBefore(now)) {
        birthday.add(1, 'years');
      }

      this.char.daysTillBirthday = birthday.diff(now, 'days');

      // Define left and right buttons for pressing, and char select link
      this.buttonCoords.push(...[
        {
          x1: this.arrows.margin,
          y1: (this.height / 2) - (this.arrows.height / 2),
          x2: this.arrows.margin + (this.arrows.width + this.arrows.thickness),
          y2: (this.height / 2) + (this.arrows.height / 2),
          onClick() {
            onClickArrow(sk, -1);
          },
        },
        {
          x1: this.width - (this.arrows.margin + (this.arrows.width + this.arrows.thickness)),
          y1: (this.height / 2) - (this.arrows.height / 2),
          x2: this.width - this.arrows.margin,
          y2: (this.height / 2) + (this.arrows.height / 2),
          onClick() {
            onClickArrow(sk, 1);
          },
        },
        {
          x1: 0,
          y1: 0,
          x2: this.width,
          y2: sk.floor(this.height / 12),
          onClick() {
            window.location.replace(getUrl(-1));
          },
        },
      ]);

      // Adjust measurements that aren't dependent on stat key
      if (height !== 1100) {
        verticalMeasures.yValues.forEach((yVal, idx) => {
          verticalMeasures.yValues[idx] = height * (yVal / 1100);
        });

        verticalMeasures.arrowYs.forEach((yVal, idx) => {
          verticalMeasures.arrowYs[idx] = height * (yVal / 1100);
        });
      }

      // Perform processing on everything depending on stat key
      keys.forEach((key) => {
        const { min, max } = chImg[key];

        // Adjust measurements
        if (width !== 800) {
          verticalMeasures[key] = width * (verticalMeasures[key] / 800);
        }

        if (height !== 400) {
          min.y = height * (min.y / 400);
          max.y = height * (max.y / 400);
          regularMeasures[key][0][1] = height * (regularMeasures[key][0][1] / 400);
          regularMeasures[key][1][1] = height * (regularMeasures[key][1][1] / 400);
        }

        if (width !== 400) {
          min.x = width * (min.x / 400);
          max.x = width * (max.x / 400);
          regularMeasures[key][0][0] = width * (regularMeasures[key][0][0] / 400);
          regularMeasures[key][1][0] = width * (regularMeasures[key][1][0] / 400);
        }

        // Calculate position values for non-vertical layout.
        // It's a one-time thing so it doesn't really need to be optimized out.
        const a = (max.y - min.y) / (max.x - min.x);
        const mult = (min.x < max.x ? 1 : -1);
        const totalLen = sk.sqrt(sk.sq(max.x - min.x) + sk.sq(max.y - min.y));
        const segLen = totalLen / segCount;
        const xPositions = [min.x];

        chImg[key].li = {
          a,
          b: min.y - (a * min.x),
        };

        for (let i = 1; i <= segCount; i += 1) {
          const d = segLen * i;
          let xPos = sk.round(
            min.x + (sk.sqrt(sk.sq(d) / (1 + sk.sq(a))) * mult),
          );

          if (i === segCount) { xPos = max.x; }

          xPositions.push(xPos);
        }

        chImg[key].xPositions = xPositions;
        chImg[key].getY = x => (chImg[key].li.a * x) + chImg[key].li.b;

        // Set current selection to be the default one for the character
        chData[key] = chImg[key].default;

        // Setup the raise and lower values arrows one time.
        if (isVertical) {
          this.markerArrows.push(...[
            [
              Directions.UP,
              verticalMeasures[key],
              verticalMeasures.arrowYs[0],
              markerArrowWidth,
              markerArrowHeight,
              markerArrowThickness,
            ],
            [
              Directions.DOWN,
              verticalMeasures[key],
              verticalMeasures.arrowYs[1],
              markerArrowWidth,
              markerArrowHeight,
              markerArrowThickness,
            ],
          ]);

          this.buttonCoords.push(...[
            {
              x1: verticalMeasures[key] - (halfMarkerArrowWidth + markerArrowPadding),
              y1: verticalMeasures.arrowYs[0] - markerArrowPadding,
              x2: verticalMeasures[key] + (halfMarkerArrowWidth + markerArrowPadding),
              y2: verticalMeasures.arrowYs[0] + (markerArrowHeight + markerArrowPadding),
              onClick() {
                onClickStatButton(key, 1);
              },
            },
            {
              x1: verticalMeasures[key] - (halfMarkerArrowWidth + markerArrowPadding),
              y1: verticalMeasures.arrowYs[1] - (markerArrowHeight + markerArrowPadding),
              x2: verticalMeasures[key] + (halfMarkerArrowWidth + markerArrowPadding),
              y2: verticalMeasures.arrowYs[1] + markerArrowPadding,
              onClick() {
                onClickStatButton(key, -1);
              },
            },
          ]);
        } else {
          this.markerArrows.push(...[
            [
              Directions.UP,
              regularMeasures[key][0][0],
              regularMeasures[key][0][1],
              markerArrowWidth,
              markerArrowHeight,
              markerArrowThickness,
            ],
            [
              Directions.DOWN,
              regularMeasures[key][1][0],
              regularMeasures[key][1][1],
              markerArrowWidth,
              markerArrowHeight,
              markerArrowThickness,
            ],
          ]);

          this.buttonCoords.push(...[
            {
              x1: regularMeasures[key][0][0] - (halfMarkerArrowWidth + markerArrowPadding),
              y1: regularMeasures[key][0][1] + markerArrowPadding,
              x2: regularMeasures[key][0][0] + (halfMarkerArrowWidth + markerArrowPadding),
              y2: regularMeasures[key][0][1] + (markerArrowHeight + markerArrowPadding),
              onClick() {
                onClickStatButton(key, 1);
              },
            },
            {
              x1: regularMeasures[key][1][0] - (halfMarkerArrowWidth + markerArrowPadding),
              y1: regularMeasures[key][1][1] - (markerArrowHeight + markerArrowPadding),
              x2: regularMeasures[key][1][0] + (halfMarkerArrowWidth + markerArrowPadding),
              y2: regularMeasures[key][1][1] + markerArrowPadding,
              onClick() {
                onClickStatButton(key, -1);
              },
            },
          ]);
        }
      });

      // Make sure we do not process characters multiple times
      this.char.isProcessed = true;
    },

    /**
     *
     */
    onClickArrow(sk, modifyBy) {
      if (
        (modifyBy < 0 && this.cid === this.minCid)
        || (modifyBy > 0 && this.cid === this.maxCid)
      ) {
        return;
      }

      this.navigateTo(sk, this.cid + modifyBy);
    },

    /**
     *
     */
    onClickCharSelector(sk, cid) {
      this.navigateTo(sk, cid);
    },

    /**
     *
     */
    onClickStatButton(stat, value) {
      if (!this.statKeys.includes(stat)) { return; }

      const maxXPos = this.char.image[stat].xPositions.length - 1;
      let newStat = this.charData[stat] + value;

      if (newStat > maxXPos) {
        newStat = maxXPos;
      } else if (newStat < 0) {
        newStat = 0;
      }

      this.charData[stat] = newStat;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
