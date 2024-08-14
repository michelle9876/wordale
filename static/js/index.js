// - Requirements
// (1) 5글자 단어 (존재하는 단어가 아니어도 됨)
// (2) 6번의 시도 가능
// (3) 존재하면 노란색, 위치도 맞으면 초록색으로 표시
// (4) 게임 종료 판단
// (추가) 상단에 게임 시간 표시하기

// (선택) 키보드에도 동일하게 표시
// (선택) 키보드 클릭으로도 입력 가능


let index = 0;
let attempts = 0;
let timer 

function appStart(){
    const displayGameover = () => {
        const div = document.createElement("div");
        div.innerText =  "게임이 종료됐습니다.";
        div.style = "display:flex; justify-content:center; align-items:center; top:40vh; left:45vw; background-color:white; width:200px; height:100px; ";
        document.body.appendChild(div);
    }
  
    const gameover = () => {
        window.removeEventListener("keydown", handleKeydown);
        displayGameover();
        clearInterval(timer);
    };

    const nextLine = () => {
        if (attempts === 6) return gameover();
        attempts += 1;
        index = 0;
    };

    const handleEnterKey = async() => {
        let 맞은_갯수 = 0;

        // ** [이해 잘 가지 않음!! 다시 복습!]
        // await async()
        // fetch: JavaScript에서 서버로 요청 보낼때 
        const 응답 = await fetch('/answer');
        console.log("응답", 응답);
        const 정답 = await 응답.json();
        console.log("정답", 정답);
        //정답확인
        for(let i=0; i < 5; i ++){
            const block = document.querySelector(
                `.board-column[data-index='${attempts}${i}']`
            );
            const 입력한_글자 = block.innerText;
            const 정답_글자 = 정답[i];
            if (입력한_글자 === 정답_글자) {
                맞은_갯수 += 1;
                block.style.background = "#6AAA64";
            }
            else if(정답.includes(입력한_글자)) block.style.background = "#C9B458";
            else block.style.background = "#787c7e";

            block.style.color = "white";

            console.log('입력한 글자:', 입력한_글자, '정답_글자:', 정답_글자)
        }     

        if (맞은_갯수 === 5) gameover();
        else nextLine();
    };

    const handleBackspace = () => {
        if (index > 0){
        const preBlock = document.querySelector(`.board-column[data-index='${attempts}${index - 1}']`);
        preBlock.innerText = "";
        }
       if (index !== 0) index -= 1;
    };

    
    const handleKeydown = (event) => {
       // key 대문자로 변환
        const key = event.key.toUpperCase();
        const keyCode = event.keyCode;
        const thisBlock = document.querySelector(`.board-column[data-index='${attempts}${index}']`);
        
        if (event.key === "Backspace") handleBackspace();

        // 한줄에 5글자만 입력할 수 있게끔! 5글자 이상이면 그냥 return
        else if(index === 5) {
            if (event.key === "Enter") handleEnterKey();
            else return;
        }
        // A ~ Z 까지 알파벳만 타이핑하겠끔!
        else if (65<=keyCode && keyCode<=90){
            thisBlock.innerText = key;
            index += 1;  
        }     
    }

    const startTimer = () => {
        const startTimer = () => {
            const 시작_시간 = new Date();

            function setTime(){
                const 현재_시간 = new Date();
                const 흐른_시간 = new Date(현재_시간 - 시작_시간);
           
                const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
                const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
                const timeDiv = document.querySelector("#timer");
                timeDiv.innerText = `${분}:${초}`;
           }
           // 주기성
           timer = setInterval(setTime, 1000);
           
        };

        startTimer();
        
    }
    window.addEventListener("keydown",handleKeydown );
}
appStart();