<template>
  <div class="container" :id="uuid" :ref="uuid">
    <div class="row justify-content-center">
      <vue-p5
        @draw="draw"
        @preload="preload"
        @setup="setup"
      />
    </div>
    <div class="row justify-content-center">
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
    <div class="row justify-content-center">
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
import { characters as CharList, verticalMeasures } from '../characters';

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
      bgImg: null,
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
      height: 400,
      lastFps: 0,
      lastFpsUpdate: 0,
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
    preload(sk) {
      const charsDir = (this.vertical ? 'chars_vert' : 'chars');

      this.char = this.getCharacterById(this.cid);
      this.bgImg = sk.loadImage(`/assets/${charsDir}/${this.char.image.name}`);
    },

    setup(sk) {
      this.bgImg.resize(this.width, 0);
      this.height = this.bgImg.height;
      sk.createCanvas(this.width, this.height);

      this.processCharacter(sk);
    },

    draw(sk) {
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

      sk.background(colors.bg);
      sk.image(this.bgImg, 0, 0);

      sk.textSize(14);
      sk.textAlign(sk.RIGHT, sk.TOP);
      sk.stroke(colors.fontStroke);
      sk.fill(colors.fontFill);
      sk.strokeWeight(1);
      sk.text(`${this.lastFps}`, sk.width - 5, 5);

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

    getCharacterById(cid) {
      const sCid = parseInt(cid, 10);
      return CharList.find(elem => elem.cid === sCid);
    },

    processCharacter(sk) {
      if (this.char.isProcessed) { return; }

      const { height, width } = this;
      const keys = this.statKeys;
      const chData = this.charData;
      const chImg = this.char.image;
      const segCount = 8;

      if (height !== 1100) {
        verticalMeasures.yValues.forEach((yVal, idx) => {
          verticalMeasures.yValues[idx] = height * (yVal / 1100);
        });
      }

      keys.forEach((key) => {
        const { min, max } = chImg[key];

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
          let xPos =
              sk.round(min.x + (sk.sqrt(sk.sq(d) / (1 + sk.sq(a))) * mult));

          if (i === segCount) { xPos = max.x; }

          xPositions.push(xPos);
        }

        chImg[key].xPositions = xPositions;
        chImg[key].getY = x => (chImg[key].li.a * x) + chImg[key].li.b;

        chData[key] = chImg[key].default;
      });

      this.char.isProcessed = true;
    },

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
