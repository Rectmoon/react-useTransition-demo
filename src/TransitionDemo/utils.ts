const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function wrapPromise<T>(promise: Promise<T>) {
  let status = "pending";
  let result: T;
  let suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = e;
    }
  );
  return {
    read(): T {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
      return result;
    }
  };
}

export interface MockItem {
  id: number;
  name: string;
  age: number;
}

async function getMockList(current: number) {
  // console.log(current);
  await sleep(2000);
  // console.log(current, "fetched");

  if (current === 2) {
    return [
      {
        id: 5,
        name: "孙七",
        age: 23
      },
      {
        id: 6,
        name: "周八",
        age: 28
      },
      {
        id: 7,
        name: "吴九",
        age: 35
      },
      {
        id: 8,
        name: "郑十",
        age: 36
      }
    ];
  }

  return [
    {
      id: 1,
      name: "张三",
      age: 11
    },
    {
      id: 2,
      name: "李四",
      age: 22
    },
    {
      id: 3,
      name: "王五",
      age: 33
    },
    {
      id: 4,
      name: "赵六",
      age: 44
    }
  ];
}

export function fetchMockData(current: number) {
  return wrapPromise(getMockList(current));
}
