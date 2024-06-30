<script setup lang="ts" name="BetsHistory">
import { faker } from '@faker-js/faker'
const bets = [
  {
    avatar: faker.image.urlLoremFlickr({ category: 'people' }),
    name: 'Luke Skywalker',
    time: '14:21:23',
    amount: '$93',
    multiplier: 2.0,
    total: 186,
    result: 'win'
  },
  {
    avatar: faker.image.urlLoremFlickr({ category: 'people' }),
    name: 'Luke Skywalker',
    time: '14:21:23',
    amount: '$93',
    multiplier: 2.0,
    total: 186,
    result: 'win'
  },
  {
    avatar: faker.image.urlLoremFlickr({ category: 'people' }),
    name: 'Luke Skywalker',
    time: '14:21:23',
    amount: '$93',
    multiplier: 2.0,
    total: 186,
    result: 'win'
  },
  {
    avatar: faker.image.urlLoremFlickr({ category: 'people' }),
    name: 'Luke Skywalker',
    time: '14:21:23',
    amount: '$93',
    multiplier: 1.2,
    total: 186,
    result: 'lose'
  }
]
</script>

<template>
  <div class="bets-history__wrapper">
    <div class="bets-history__box">
      <div class="bets-history__history">
        <div class="bets-history__history-header">
          <h2>Bets History</h2>
          <button>History</button>
        </div>
        <div class="bets-history__history-table">
          <div class="table">
            <div class="thead">
              <div class="tr">
                <div class="th">User</div>
                <div class="th">Time</div>
                <div class="th">Amount</div>
                <div class="th">Multiplier</div>
                <div class="th">Total</div>
              </div>
            </div>
            <div class="tbody">
              <div class="tr" v-for="(bet, index) in bets" :key="index">
                <div class="td">
                  <div class="user-info">
                    <img :src="bet.avatar" alt="avatar" class="avatar" />
                    <span>{{ bet.name }}</span>
                  </div>
                </div>
                <div class="td">{{ bet.time }}</div>
                <div class="td">{{ bet.amount }}</div>
                <div class="td">
                  <div
                    :class="[
                      'multiplier',
                      { positive: bet.result === 'win', negative: bet.result === 'lose' }
                    ]"
                  >
                    {{ bet.multiplier.toFixed(2) }}x
                  </div>
                </div>
                <div class="td">
                  <div
                    :class="[
                      'total',
                      { positive: bet.result === 'win', empty: bet.result === 'lose' }
                    ]"
                  >
                    ${{ bet.total }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.bets-history {
  &__wrapper {
    background-color: #060b15;
    display: flex;
    justify-content: center;
  }
  &__box {
    padding-top: 48px;

    background-image: url('@/assets/backgroundSpaceBets.png');

    max-width: 1440px;
    min-height: 500px;
    width: 100%;
  }
  &__history {
    border: 1px solid rgba(28, 39, 52, 1);
    background: rgba(3, 15, 26, 1);
    border-radius: 16px;
    padding: 24px;
    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      h2 {
        font-family: Montagu Slab;
        font-size: 24px;
        font-weight: 500;
        line-height: 20px;
        text-align: left;
        color: rgba(255, 255, 255, 1);
      }
      button {
        font-family: Montagu Slab;
        font-size: 12px;
        font-weight: 500;
        line-height: 20px;
        text-align: left;

        border: 1px solid rgba(28, 39, 52, 1);
        background: rgba(3, 15, 26, 1);
        border-radius: 16px;
        color: rgba(255, 189, 43, 1);
        cursor: pointer;

        padding: 10px 16px;
        transition: border-color 0.3s;
        &:hover {
          border: 1px solid rgba(235, 118, 45, 1);
        }
      }
    }
    &-table {
      font-family: Montagu Slab;
      font-size: 12px;
      font-weight: 400;

      .table {
        width: 100%;
        display: flex;
        flex-direction: column;
      }

      .thead,
      .tbody {
        display: flex;
        flex-direction: column;
      }

      .tr {
        display: flex;
        background: rgba(15, 27, 38, 1);
        border: 1px solid rgba(28, 39, 52, 1);
        border-radius: 16px;
        margin-bottom: 12px;
      }

      .th,
      .td {
        padding: 10px 12px;
        flex: 1;

        display: flex;
        justify-content: center;
        align-items: center;
        word-wrap: break-word;

        color: #fff;
      }

      .thead .tr {
        background-color: inherit;
        border: none;
      }

      .th {
        color: rgba(151, 151, 151, 1);
      }

      .tbody .tr {
        background: rgba(15, 27, 38, 1);
        border: 1px solid rgba(28, 39, 52, 1);
      }

      .user-info {
        display: flex;
        align-items: center;
      }

      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 12px;
        margin-right: 12px;
      }

      .multiplier {
        display: inline-block;
        padding: 16px 40px;
        border-radius: 50px;
        text-align: center;
        color: white;
      }

      .multiplier.positive {
        background: radial-gradient(56.67% 245.95% at 48.67% 50%, #4cd452 0%, #347237 100%);
      }

      .multiplier.negative {
        background: rgba(73, 29, 29, 1);
        color: rgba(245, 85, 85, 1);
      }

      .total {
        display: inline-block;
        padding: 5px 10px;
        border-radius: 5px;
        text-align: center;
      }

      .total.positive {
        color: #4caf50;
      }

      .total.empty {
        color: #f44336;
      }
      @media screen and (max-width: 600px) {
        .table {
          display: block;
        }

        .thead,
        .tbody {
          display: block;
        }

        .tr {
          display: block;
          margin-bottom: 12px;
        }

        .th,
        .td {
          display: block;
          text-align: center;
          padding: 10px;
          position: relative;
        }

        .th::before,
        .td::before {
          content: attr(data-label);
          position: absolute;
          left: 10px;
          text-align: center;
          font-weight: bold;
        }

        .thead .tr,
        .th::before {
          display: none;
        }

        .tbody .tr .td {
          border: none;
          border-bottom: 1px solid rgba(28, 39, 52, 1);
        }

        .user-info {
          justify-content: center;
        }
      }
    }
  }
}
</style>
