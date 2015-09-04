$(function(){
	
		var socket = io(), k=0, winCom = [[1,2,3], [1,4,7], [1,5,9], [4,5,6], [7,8,9], [2,5,8], [3,6,9], [1,5,9], [3,5,7]], arrCir = [], arrTimes = [], user1P=0, user2P=0, tieP=0;
		listenGameCell();

		function listenGameCell(){
			$(".gameCell").click(function(e){
				//shoot it to the server
				socket.emit("tic-tac-toe", $(e.target).attr("data-id"));
		  });

			//when event is fired, do the following
			socket.on("tic-tac-toe", function(move){
				if(k%2){
					//user 2
					$(".gameCell[data-id="+move+"]").addClass("fa fa-circle-thin fa-5x animated bounceIn");
				}else{
					//user 1
					$(".gameCell[data-id="+move+"]").addClass("fa fa-times fa-5x animated bounceIn");
				}
				k++;
				if(k>=5){
					decideWinner();
				}
			});
		}

		function decideWinner(){
			$(".gameCell").each(function(index){
				if($(this).hasClass("fa-circle-thin")){
					arrCir.push(Number($(this).attr("data-id")));
				}else if($(this).hasClass("fa-times")){
					arrTimes.push(Number($(this).attr("data-id")));
				}
			});
			
			winCom.forEach(function(el){
				if(_.isEqual(_.sortBy(_.intersection(arrTimes, el)),el)){
					user1P++;
					socket.emit("winning", arrTimes);
				}else if(_.isEqual(_.sortBy(_.intersection(arrCir, el)),el)){
					user2P++;
					socket.emit("winning", arrCir);
				}
			});
				socket.emit("who-wins", {user1P: user1P, user2P: user2P, tieP: tieP});
		}

			//when event is fired, do the following
		socket.on("who-wins", function(point){
			$("h3[data-id=user1P]").text(point.user1P);
			$("h3[data-id=user2P]").text(point.user2P);
			$("h3[data-id=tieP]").text(point.tieP);
		});

		socket.on("winning", function(position){
			position.forEach(function(el){
				$(".gameCell[data-id="+el+"]").removeClass("bounceIn");
				$(".gameCell[data-id="+el+"]").addClass("tada");
			});
		});


});










