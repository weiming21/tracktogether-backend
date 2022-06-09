function getMinimumTransactions(debt) {
  //Returns [arrayOfTransactions];
  function helper(curr, debt, transactions) {
    while (curr < debt.length && debt[curr] === 0) {
      curr++;
    }

    if (curr === debt.length) {
      return transactions;
    }

    let minTransactions = null;

    for (let i = curr + 1; i < debt.length; i++) {
      if (debt[i] * debt[curr] < 0) {
        debt[i] += debt[curr];
        if (minTransactions === null) {
          minTransactions = helper(curr + 1, debt, [
            ...transactions,
            [curr, i, debt[curr]],
          ]);
        } else {
          if (
            helper(curr + 1, debt, [...transactions, [curr, i, debt[curr]]])
              .length < minTransactions.length
          ) {
            minTransactions = helper(curr + 1, debt, [
              ...transactions,
              [curr, i, debt[curr]],
            ]);
          }
        }
        debt[i] -= debt[curr];
        //let recursiveCase = helper(curId + 1, debt, [...transactions, [currId, i, debt[currId]]]);
        //if (helper(curId + 1, debt, transactions) + 1 < )
      }
    }

    return minTransactions;
  }

  let result = helper(0, debt, []);
  result = result.map((entry) => {
    if (entry[2] < 0) {
      return [entry[1], entry[0], -entry[2]];
    } else {
      return entry;
    }
  });

  return result;
}

// const testCase1 = [3, -65, 2, 76, 33, -49];
// console.log(getMinimumTransactions(testCase1));

// const testCase2 = [2, 2, 5, 7, -12, -4];
// console.log(getMinimumTransactions(testCase2));

// const testCase3 = [2, 2, 5, 7, -12, -4];
// console.log(getMinimumTransactions(testCase3));

exports.getMinimumTransactions = getMinimumTransactions;
