const forEach = (array, fn) => {
    let i;
    for (i = 0; i < array.length; i++) {
        fn(array[i]);
    }
};

exports.modules = forEach;