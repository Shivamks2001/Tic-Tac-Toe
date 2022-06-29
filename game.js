let count = 1;

let countx = 0;
let counto = 0;
let countTie = 0;

let winningPattern = [[[1,2,3],[1,4,7,],[1,5,9]],
                         [[1,2,3],[2,5,8]],       
                         [[1,2,3],[3,6,9],[3,5,7]],
                         [[1,4,7],[4,5,6]],
                         [[2,5,8],[1,5,9],[7,5,3],[4,5,6]],
                         [[3,6,9],[4,5,6]],
                         [[1,4,7],[7,8,9],[3,5,7]],
                         [[2,5,8],[7,8,9]],
                         [[7,8,9],[3,6,9],[1,5,9]]                   
                        ];

$(".box").click(function()
{

    if(this.innerHTML == "X" || this.innerHTML == "O") return;

    else if(count % 2 == 0)
    {
        this.innerHTML = "O";
        playSound("O",0);
    }

    else if(count % 2 != 0)
    {
        this.innerHTML = "X";
        playSound("X",0);
    }

    let winner = decideWinner(this);

    if(winner != 0)
    {
        count = 1;
        changeScore(this.innerHTML);
        WinningAnimation(winner);
        omitTable(2000);
        return;
    }

    if(count == 9)
    {
        changeScore("tie");
        count = 1;
        drawAinmation();
        omitTable(2000);
        return;
    }
    count++;
});

function omitTable(time)
{
    setTimeout(function()
    {
        $(".box").text("");
    },time);
}

function decideWinner(element)
{
    let index = Number(element.classList[2]);
    let array = winningPattern[index-1];
    let a = 0;
    for(let i = 0;i < array.length;i++)
    {
        for(k = 0;k < 3;k++)
        {
            if($("." + array[i][k]).html() != $(element).html())
            {
                a = 1;
                break;
            }
        }
        if(a == 0)
        {
            return array[i];
        }
        a = 0;
    }
    return 0;
}

function WinningAnimation(winner)
{
    let char = $("." + winner[0]).html();
    $("." + winner[0]).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
    $("." + winner[1]).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
    $("." + winner[2]).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
    playSound(char,500);
}


function playSound(char,time)
{
    let audio = new Audio("Sounds/" + char + ".mp3");
    setTimeout(function()
    {
        audio.play();
    },time);
}

function drawAinmation()
{
    playSound("wrong",0);
    $(".hLine").fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
    $(".vLine").fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
}

function changeScore(player)
{
    if(player == "X")
    {
        countx++;
        $(".countx").html("<p>"+ countx + "</p>")
    }
    else if(player == "O")
    {
        counto++;
        $(".counto").html("<p>"+ counto + "</p>")
    }
    else
    {
        countTie++;
        $(".count-tie").html("<p>"+ countTie + "</p>");
    }
}



