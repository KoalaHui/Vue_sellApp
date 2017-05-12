<template>
  <div class="seller" ref="sellers">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <span class="icon-favorite" :class="{'active':favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item border-1px" v-for="(item,index) in seller.supports">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li class="info-item" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import split from '../split/split';
  import star from '../star/star';

  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        favorite: (() => {
          return this.loadFromLocal(this.seller.id, 'favorite', false);
        })()
      };
    },
    computed: {
      favoriteText() {
        return this.favorite ? '已收藏' : '收藏';
      },
      saveToLocal(id, key, value) {
        let seller = window.localStorage.__seller__;
        if (!seller) {
          seller = {};
          seller[id] = {};
        } else {
          seller = JSON.parse(seller);
          if (!seller[id]) {
            seller[id] = {};
          }
        }
        seller[id][key] = value;
        window.localStorage.__seller__ = JSON.stringify(seller);
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    watch: {
      'seller'() {
        this._initScroll();
        this._initPics();
      }
    },
    ready() {
      this._initScroll();
      this._initPics();
    },
    methods: {
      toggleFavorite(event) {
        if (!event._constructed) {
          return;
        }
        this.favorite = !this.favorite;
        this.saveToLocal(this.seller.id, 'favorite', this.favorite);
      },
      loadFromLocal(id, key, def) {
        let seller = window.localStorage.__seller__;
        if (!seller) {
          return def;
        }
        seller = JSON.parse(seller)[id];
        if (!seller) {
          return def;
        }
        let ret = seller[key];
        return ret || def;
      },
      _initScroll() {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.sellers, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      },
      _initPics() {
        if (this.seller.pics) {
          let picWidth = 120;
          let margin = 6;
          let width = (picWidth + margin) * this.seller.pics.length - margin;
          this.$refs.picList.style.width = width + 'px';
          this.$nextTick(() => {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              });
            } else {
              this.picScroll.refresh();
            }
          });
        }
      }
    },
    components: {
      split,
      star
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";

  .seller
    position: absolute
    top: 174px
    left: 0
    width: 100%
    overflow: hidden
    .overview
      position: relative;
      padding: 18px
      .title
        margin-bottom: 8px
      .desc
        font-size: 0
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        .star
          display inline-block
          margin-right: 8px;
          vertical-align: top
        .text
          font-size: 10px
          color: rgb(77, 85, 93)
          line-height: 18px
          margin-right: 12px
          vertical-align: top

      .remark
        display: flex
        padding-top: 18px
        .block
          flex: 1
          text-align: center
          border-right: 1px solid rgba(7, 17, 27, 0.1)
          &:last-child
            border: none
          h2
            margin-bottom: 8px
            font-size: 10px
            color: rgb(147, 153, 159)
            line-height: 10px
          .content
            font-size: 10px
            color: rgb(7, 17, 27)
            line-height: 10px
            .stress
              font-size: 24px

      .favorite
        position: absolute
        width: 50px
        right: 11px
        top: 18px
        text-align: center
        .icon-favorite
          display: block
          font-size: 24px
          line-height: 24px
          margin-bottom: 8px
          color: #d4d6d9
          &.active
            color: rgb(240, 20, 20)
        .text
          font-size: 10px
          color: rgb(77, 85, 93)
          line-height: 10px
    .bulletin
      padding: 18px 18px 0 18px
      .content-wrapper
        margin-top: 8px
        .content
          padding 0 12px
          font-size: 12px
          color: rgb(240, 20, 20)
          line-height: 24px
          margin-bottom: 16px
      .supports
        border-top: 1px solid rgba(7, 17, 27, 0.1)
        .support-item
          padding: 16px 12px
          border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .icon
          display: inline-block
          width: 16px
          height: 16px
          vertical-align: top
          margin-right: 6px
          background-size: 16px 16px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_4')
          &.discount
            bg-image('discount_4')
          &.guarantee
            bg-image('guarantee_4')
          &.invoice
            bg-image('invoice_4')
          &.special
            bg-image('special_4')
        .text
          font-size: 12px
          color: rgb(7, 17, 27)
          font-weight: 200
          line-height: 16px
          margin-left: 6px

    .pics
      padding: 18px
      .pic-wrapper
        margin-top: 12px
        width: 100%
        overflow: hidden
        white-space: nowrap
        .pic-item
          display: inline-block
          width: 120px
          height: 90px
          margin-right: 6px
          &:last-child
            margin-right: 0

    .info
      padding: 18px
      .title
        margin-bottom: 12px
      .info-item
        padding: 16px 12px
        font-size: 12px
        color: rgb(7, 17, 27)
        font-weight: 200
        line-height: 16px
        border-top: 1px solid rgba(7, 17, 27, 0.1)

</style>
