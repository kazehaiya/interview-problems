/**
 * 实现一个任务调度函数
 */
(function () {
  class Scheduler {
    constructor(maxUsed = 2) {
      this.eventList = [];
      this.used = 0;
      this.maxUsed = maxUsed;
      this.currentPos = 0;
    }

    add(timeout, val) {
      const excute = () => {
        if (
          this.currentPos < this.eventList.length &&
          this.used < this.maxUsed
        ) {
          const tarData = this.eventList[this.currentPos++];
          const { res, rej, timeout, val } = tarData;
          this.used++;

          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(val);
            }, timeout);
          })
            .then(res, rej)
            .finally(() => {
              this.used--;
              excute();
            });
        }
      };

      // 执行任务
      return new Promise((res, rej) => {
        this.eventList.push({
          res,
          rej,
          timeout,
          val,
        });

        excute();
      });
    }
  }

  const scheduler = new Scheduler();

  scheduler.add(1000, '1').then((res) => {
    console.log(res);
  });
  scheduler.add(500, '2').then((res) => {
    console.log(res);
  });
  scheduler.add(300, '3').then((res) => {
    console.log(res);
  });
  scheduler.add(400, '4').then((res) => {
    console.log(res);
  });
})();
