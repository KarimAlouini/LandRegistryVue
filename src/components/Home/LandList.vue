<template>
  <div class="vuestic-feed">
    <div v-if="lands.length == 0" class="empty">Your feed is empty.</div>
    <div class="post" v-for="(land,index) in lands" :class="{last: lands.indexOf(land) === lands.length - 1}">
      <div class="underscored">
        <router-link :to="{ name: 'land', params: { id:land.info._id}}">
          <span class="text"><span class="name">{{land.info.area}} m² @ {{land.info.number}} ,  {{land.info.localization.street}} street ,  {{land.info.localization.city}} [{{land.info.localization.zipCode}}] </span> </span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'land-list-home',
    props: ['landslist'],
    data() {
      return {
        lands: this.landslist
      }
    },

  }
</script>

<style lang="scss">
  @import "../../sass/variables";

  .vuestic-feed {
    padding-top: .5rem;
    padding-bottom: .5rem;
    padding-left: 1.5rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .empty {
      text-align: center;
    }
    .post {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .photo-container {
        margin-right: 1rem;
        border-radius: 50%;
        border: 2px solid $lighter-gray;
        .photo {
          background-size: cover !important;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
        }
      }
      .underscored {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: $light-gray2 2px solid;
        overflow: hidden;
        padding-right: 0.7rem;
        height: 3.5rem;
        .text {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          .name {
            font-weight: $font-weight-bold;
          }
        }
        .close-btn {
          margin-left: 1rem;
          i {
            left: 10.5px;
          }
        }
      }
      &.last {
        .underscored {
          border-bottom: none;
        }
      }
    }

    .text {
      color: $vue-darkest-blue
    }
  }
</style>
