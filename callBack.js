
function fu1(fu, num) {

    fu();

    console.log(num);
};

fu1(function() {
    console.log('abc');
}, 100);