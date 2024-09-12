//gogo();

//promise
function gogo() {
    console.log('start');

    let pro = new Promise((resolve, reject) => {
        let success = false;
        if(success) {
            //성공
            resolve('this is success');
        } else {
            reject('fail');
        }
    });
    pro.then(resolve => {
        console.log(resolve);
    })
    .catch(reject => {
        console.log( reject);
    })
    .finally(() => {
        console.log('반드시 실행');
    })
}

//time();
function time() {
    console.log('time start');
    setTimeout(function() {
        for(let i = 0; i < 10; i++) {
            console.log(i);
        }
    }, 1000);
    console.log('time end');
}

let proTime = () => {
    console.log('time start1');
    let pro = new Promise((resolve, reject) => {
        setTimeout(function() {
            for(let i = 0; i < 10; i++) {
                console.log(i);
            }
            resolve();
        }, 1000);
    })
    
    pro.finally(() => {
        console.log('time end');
    });
}
//proTime();


an();
//async
async function an() {
    await new Promise(resolve => setTimeout(() => {
        console.log('setTimeout12');
        resolve();
    }, 2000));

    await console.log('start');
}