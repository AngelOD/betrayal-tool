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
    <div class="row justify-content-center" v-if="!hasError">
      <div class="btn-group btn-group-sm" role="group" aria-label="">
        <button
          type="button"
          class="btn btn-secondary"
          @click="onClickStatButton('knowledge', 1)"
        ><strong>K+</strong></button>
        <button
          type="button"
          class="btn btn-secondary"
          @click="onClickStatButton('might', 1)"
        ><strong>M+</strong></button>
        <button
          type="button"
          class="btn btn-secondary"
          @click="onClickStatButton('sanity', 1)"
        ><strong>Sa+</strong></button>
        <button
          type="button"
          class="btn btn-secondary"
          @click="onClickStatButton('speed', 1)"
        ><strong>Sp+</strong></button>
      </div>
    </div>
    <div class="row justify-content-center" v-if="!hasError">
      <div class="btn-group btn-group-sm" role="group" aria-label="">
        <button
          type="button"
          class="btn btn-secondary"
          @click="onClickStatButton('knowledge', -1)"
        ><strong>K-</strong></button>
        <button
          type="button"
          class="btn btn-secondary"
          @click="onClickStatButton('might', -1)"
        ><strong>M-</strong></button>
        <button
          type="button"
          class="btn btn-secondary"
          @click="onClickStatButton('sanity', -1)"
        ><strong>Sa-</strong></button>
        <button
          type="button"
          class="btn btn-secondary"
          @click="onClickStatButton('speed', -1)"
        ><strong>Sp-</strong></button>
      </div>
    </div>
    {{ tmpInfo }}
  </div>
</template>

<script>
import VueP5 from 'vue-p5';
import moment from 'moment';
import { characters as CharList, verticalMeasures } from '../characters';
import Directions from '../constants';

let uuid = 1;

export default {
  name: 'betrayal-character',

  components: {
    'vue-p5': VueP5,
  },

  props: {
    cid: {
      type: Number,
      required: true,
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
      hasError: false,
      height: 400,
      lastFps: 0,
      lastFpsUpdate: 0,
      markerArrows: [],
      markerArrowData: {
        height: 15,
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
      this.char = this.getCharacterById(this.cid);

      if (!this.char) {
        this.hasError = true;
      } else {
        this.bgImg = sk.loadImage(`/assets/${charsDir}/${this.char.image.name}`);
      }
    },

    /**
     *
     */
    setup(sk) {
      if (!this.hasError) {
        this.bgImg.resize(this.width, 0);
        this.height = this.bgImg.height;

        this.processCharacter(sk);
      }

      sk.createCanvas(this.width, this.height);
    },

    /**
     *
     */
    draw(sk) {
      if (this.hasError) {
        sk.background(255);
        sk.textSize(32);
        sk.textAlign(sk.CENTER, sk.MIDDLE);
        sk.stroke('red');
        sk.fill('red');
        sk.strokeWeight(1);
        sk.text('ERROR!', sk.width / 2, sk.height / 2);

        return;
      }

      const ch = this.char;
      const chData = this.charData;
      const chImg = ch.image;
      const { colors } = this;
      const isVertical = this.vertical;
      const now = Date.now();

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
      sk.text(`${this.lastFps}`, sk.width - 5, 5);

      sk.textAlign(sk.LEFT, sk.TOP);
      sk.text(`${this.char.daysTillBirthday} days`, 5, 5);

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

      // TODO Marker buttons
      sk.fill('red');
      sk.stroke('red');
      sk.strokeWeight(1);

      this.statKeys.forEach((key) => {
        const arrows = [];

        if (isVertical) {
          arrows.push(...[
            [
              Directions.UP,
              verticalMeasures[key],
              verticalMeasures.arrowYs[0],
              20,
              15,
              4,
            ],
            [
              Directions.DOWN,
              verticalMeasures[key],
              verticalMeasures.arrowYs[1],
              20,
              15,
              4,
            ],
          ]);
        } else {
          // TODO Complete this!
        }

        const { drawArrow } = this;
        arrows.forEach((arrow) => {
          drawArrow(sk, ...arrow);
        });
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
      const arrowHalfHeight = this.arrows.height / 2;
      const arrowMargin = this.arrows.margin;
      const arrowTotalWidth = (this.arrows.width + this.arrows.thickness);
      const halfHeight = this.height / 2;
      const mX = sk.mouseX;
      const mY = sk.mouseY;

      const left = [
        arrowMargin,
        halfHeight - arrowHalfHeight,
        arrowMargin + arrowTotalWidth,
        halfHeight + arrowHalfHeight,
      ];
      const right = [
        this.width - (arrowMargin + arrowTotalWidth),
        left[1],
        this.width - arrowMargin,
        left[3],
      ];

      if (
        this.cid > this.minCid
        && mX >= left[0] && mX <= left[2]
        && mY >= left[1] && mY <= left[3]
      ) {
        this.onClickArrow(sk, -1);
      }

      if (
        this.cid < this.maxCid
        && mX >= right[0] && mX <= right[2]
        && mY >= right[1] && mY <= right[3]
      ) {
        this.onClickArrow(sk, 1);
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
    processCharacter(sk) {
      if (this.char.isProcessed) { return; }

      const { height, width } = this;
      const keys = this.statKeys;
      const chData = this.charData;
      const chImg = this.char.image;
      const segCount = 8;
      const isVertical = this.vertical;
      const { onClickStatButton } = this;

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
        }

        if (width !== 400) {
          min.x = width * (min.x / 400);
          max.x = width * (max.x / 400);
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
              this.markerArrowData.width,
              this.markerArrowData.height,
              this.markerArrowData.thickness,
            ],
            [
              Directions.DOWN,
              verticalMeasures[key],
              verticalMeasures.arrowYs[1],
              this.markerArrowData.width,
              this.markerArrowData.height,
              this.markerArrowData.thickness,
            ],
          ]);

          this.buttonCoords.push(...[
            {
              x1: verticalMeasures[key] - (this.markerArrowData.width / 2),
              y1: verticalMeasures.arrowYs[0],
              x2: verticalMeasures[key] + (this.markerArrowData.width / 2),
              y2: verticalMeasures.arrowYs[0] + this.markerArrowData.height,
              onClick() {
                onClickStatButton(key, 1);
              },
            },
            {
              x1: verticalMeasures[key] - (this.markerArrowData.width / 2),
              y1: verticalMeasures.arrowYs[1] - this.markerArrowData.height,
              x2: verticalMeasures[key] + (this.markerArrowData.width / 2),
              y2: verticalMeasures.arrowYs[1],
              onClick() {
                onClickStatButton(key, 2);
              },
            },
          ]);
        } else {
          // TODO Setup non-vertical versions
        }
      });

      // Make sure we do not process characters multiple times
      this.char.isProcessed = true;
    },

    /**
     *
     */
    onClickArrow(sk, modifyBy) {
      const newCid = sk.constrain(this.cid + modifyBy, this.minCid, this.maxCid);
      const newUrl = this.getUrl(newCid);

      window.location.replace(newUrl);
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
