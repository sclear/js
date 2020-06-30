' 无key diff 切勿用重复数字,因无引用导致无法确定删除项 '

let newAry = [9,9,9,9]
let oAry = [9,4,8,1, 2, 5]

function removes(nowAry, delAry) {
    for( let i = 0;i < delAry.length; i++ ) {
        let Idx = nowAry.indexOf( delAry[i] );
        if(Idx !== -1) {
            nowAry.splice(Idx, 1);
            i--
        }
    }
}

function diff(newV, oldV) {
    let nsAry = [...oAry]
    let nStartIdx = 0, nEndIdx = newV.length - 1;
    let oStartIdx = 0, oEndIdx = oldV.length - 1;

    let nStartVal = newV[nStartIdx], nEndVal = newV[nEndIdx];
    let oStartVal = oldV[oStartIdx], oEndVal = oldV[oEndIdx];

    while (oStartIdx <= oEndIdx && nStartIdx <= nEndIdx) {
        if(!oStartVal) {
            oStartVal = oldV[ ++oStartIdx ]
        }
        else if(!oEndVal) {
            oEndVal = oldV[--oEndIdx]
        }
        else if(!nStartVal) {
            nStartVal = newV[++nStartIdx]
        }
        else if(!nEndVal) {
            nEndVal = newV[--nEndIdx]
        }
        // 首首对比
        else if (nStartVal === oStartVal) {
            console.log('ss')
            oStartVal = oldV[++oStartIdx];
            nStartVal = newV[++nStartIdx];
        }
        // 尾 尾对比
        else if (nEndVal === oEndVal) {
            console.log('ww')
            oEndVal = oldV[--oEndIdx];
            nEndVal = newV[--nEndIdx];
        }
        // 尾 首对比
        else if (nEndVal === oStartVal) {
            console.log('ws')
            let Idex = nsAry.indexOf( oEndVal )     //找出插入位置
            let DelIdx = nsAry.indexOf(oStartVal)   // 找出删除位置
            let str = nsAry.splice( DelIdx, 1 )[0]  // 找出字符 剪切
            nsAry.splice(Idex, 0, str)              // 插入
            oStartVal = oldV[++oStartIdx];
            nEndVal = newV[--nEndIdx];
        }
        // 首 尾对比
        else if (nStartVal === oEndVal) {
            console.log('sw')
            let Idex = nsAry.indexOf(oStartVal);    // 找出插入位置
            let DelIdx = nsAry.indexOf(oEndVal)     // 找出删除old index
            let str = nsAry.splice(DelIdx, 1)[0];   // 找出字符 剪切
            nsAry.splice(Idex, 0, str)              // 插入应该插入的位置
            nStartVal = newV[++nStartIdx];
            oEndVal = oldV[--oEndIdx];
        }
        // 对比失效
        else {
            console.log('Fail')
            nsAry.splice(nStartIdx, 0, newV[nStartIdx])
            nStartVal = newV[++nStartIdx];
        }
    }
    if(nStartIdx > nEndIdx) {
        removes(nsAry, oldV.splice(oStartIdx, oEndIdx))
    }
    return nsAry

}
console.log('end',diff(newAry, oAry))

const context = {
    fn() {
        'xx00'
    }
}


