<template>
  <vue-p5
    @draw="draw"
    @preload="preload"
    @setup="setup"
  />
</template>

<script>
import VueP5 from 'vue-p5';
import CharList from '../characters';

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
    height: {
      type: Number,
      default: 400,
    },
    width: {
      type: Number,
      default: 400,
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
      statKeys: ['knowledge', 'might', 'sanity', 'speed'],
    };
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  beforeDestroy() {},

  destroyed() {},

  methods: {
    preload(sk) {
      this.bgImg = sk.loadImage('/assets/chars/blue_1.png');
      this.char = this.getCharacterById(this.cid);
    },

    setup(sk) {
      sk.createCanvas(this.width, this.height);
      this.bgImg.resize(this.width, this.height);

      this.processCharacter(sk);
    },

    draw(sk) {
      const ch = this.char;
      const chData = this.charData;
      const chImg = ch.image;

      sk.background(220);
      sk.image(this.bgImg, 0, 0);
      sk.stroke(0);
      sk.fill(0);

      sk.ellipse(100, 100, 10);
      sk.text(`(${sk.round(sk.mouseX)}, ${sk.round(sk.mouseY)})`, 10, 20);
      sk.text(`${ch.name}`, 10, 40);

      this.statKeys.forEach((key) => {
        chImg[key].xPositions.forEach((x, idx) => {
          sk.ellipse(x, chImg[key].getY(x), 5);

          if (idx === chData[key]) {
            sk.noFill();
            sk.ellipse(x, chImg[key].getY(x), 10);
            sk.fill(0);
          }
        });
      });
    },

    getCharacterById(cid) {
      const sCid = parseInt(cid, 10);
      return CharList.find(elem => elem.cid === sCid);
    },

    processCharacter(sk) {
      const keys = this.statKeys;
      const chData = this.charData;
      const chImg = this.char.image;
      const segCount = 8;

      keys.forEach((key) => {
        const { min, max } = chImg[key];
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
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
