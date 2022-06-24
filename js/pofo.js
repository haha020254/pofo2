(($)=>{
    
    
    //클래스
    class Pofo {
        init(){
            this.header();
            this.section1();
            this.section2();
            this.section3();
            this.section4();
            this.section5();
            this.section6();
            this.section7();
            this.section8();
            this.section9();
            this.footer();
            this.quick();
            this.gotop();
        }
        header(){

            let t = false; //모바일
            let t2 = false; //pc

            //모바일 메뉴 버튼 이벤트
            $('.mobile-btn').on({
                click: function(){
                    $(this).toggleClass('on');
                    $('#nav').stop().slideToggle(300);
                }
            });
            
            //메인메뉴

            //기본값
            $('.sub').stop().slideUp(0);

            //반응형
            $(window).resize(function(){ //창크기가 변경될 때만 실행
                resizeNav();
            });

            //반응형 네비게이션
            function resizeNav(){
                if($(window).width()<=1024){
                    $('#nav').stop().hide();
                    t2=false;
                    if(t===false){
                        t=true;
                        //마우스 오버 이벤트 삭제
                        $('.sub').stop().fadeOut(0);
                        $('.main-btn').off('mouseenter');

                        //1024 이하 해상도 마우스클릭 - 모바일
                        $('.main-btn').bind({
                            click: function(){
                            $(this).next().stop().slideToggle(300);
                            }
                        });
                    }
                }
                else{
                    $('.mobile-btn').removeClass('on');
                    $('#nav').stop().show();

                    t=false;

                    if(t2===false){
                        t2=true;
                        //1024 초과 해상도 마우스오버 - 데스크탑
                        //클릭 이벤트 삭제
                        $('.main-btn').off('click');
                        $('.main-btn').on('mouseenter');
                        $('.sub').stop().slideUp(0);

                        $('.main-btn').on({
                            mouseenter: function(){
                                $('.sub').fadeOut(0);
                                $(this).next().fadeIn(300);
                            }
                        });

                        $('#nav').on({
                            mouseleave: function(){
                                $('.sub').fadeOut(300);
                            }
                        });

                        //서브메뉴
                        $('.sub-btn').on({
                            mouseenter: function(){
                                $('.sub-sub').fadeOut(0);
                                $(this).next().fadeIn(300);
                            }
                        });
                        $('.col24').on({
                            mouseleave: function(){
                                $('.sub-sub').fadeOut(300);
                            }
                        });
                    }
                }
            }

            resizeNav(); //로딩시 실행

            //스크롤이벤트
            let upDown = '';
            let  newTop = $(window).scrollTop(); //현재 위치의 스크롤 탑값
            let  oldTop = newTop; //이전 스크롤 탑값 위치

            $(window).scroll(function(){
                
                //스크롤이 아래로 발생 할 시 : 스크롤 다운
                //스크롤이 위로 발생 할 시 : 스크롤 업
                newTop = $(window).scrollTop();

                upDown = oldTop - newTop > 0 ? 'UP' : 'DOWN';
                if(upDown==='UP'){ //네비게이션 보이기
                    $('#header').removeClass('hide');
                    $('#header').addClass('show');
                }
                if(upDown==='DOWN'){ //네비게이션 감추기
                    $('#header').removeClass('show');
                    $('#header').addClass('hide');
                }
                if(newTop===0){
                    $('#header').removeClass('show');
                }

                oldTop = newTop;
            });

        }
        section1(){
            let cnt=0;
            let n = $('#section1 .slide').length-3;
            let setId=0;
            let setId2=0;
            let touchStart = null;
            let touchEnd = null;
            let result = '';
            let dragStart = null;
            let dragEnd = null;
            let mouseDown = false; //논리 변수 true(마우스다운상태), false(마우스다운안한상태)
            
            //슬라이드 너비 반응형 구하기
            let winW = $(window).width();
            $(window).resize(function(){
                winW = $(window).width();
                return winW;
            });
            //1.메인슬라이드함수
            function mainSlide(){
                $('#section1 .slide-wrap').stop().animate({left:-winW*cnt},600,'easeInOutExpo',function(){
                    cnt>n?cnt=0:cnt;
                    cnt<0?cnt=n:cnt;
                    $('#section1 .slide-wrap').stop().animate({left:-winW*cnt},0)
                })
            }
            //2.다음카운트함수
            function nextCount(){
                cnt++;
                mainSlide();
            }
            //2-1.이전카운트함수
            function prevCount(){
                cnt--;
                mainSlide();
            }
            //3.자동타이머함수
            function autoTimer(){
                setId = setInterval(nextCount,3000);
            }
            autoTimer();

            //타이머중지함수
            function timerfn(){
                let tCnt=0;
                clearInterval(setId); //자동 타이머중지
                clearInterval(setId2); //자동 타이머중지
                setId2 = setInterval(function(){
                   tCnt++;
                   //console.log( tCnt );
                   if(tCnt>=3){ //3초간 아무 터치없으면 자동타이머 호출 실행
                      clearInterval(setId);  
                      clearInterval(setId2); //카운트 이제그만 그리고 자동타이머실행                         
                      autoTimer(); //자동타이머 호출 실행 3초후에 실행
                   }
                }, 1000);
             }


            $('#section1 .slide-container').on({
                mousedown: function(event){ //이벤트

                    timerfn();

                  touchStart = event.clientX;
                  //drag
                  dragStart = event.clientX-$('#section1 .slide-wrap').offset().left-winW;  //반드시 초기값 0셋팅
                  mouseDown = true;
                },
                mouseup: function(event){ //이벤트
                  touchEnd = event.clientX;
                  result = touchStart-touchEnd > 0 ? 'NEXT' : 'PREV';
                  if(result==='NEXT'){
                      nextCount(); //다음슬라이드 호출
                  }
                  if(result==='PREV'){
                      prevCount(); //다음슬라이드 호출
                  }
                  mouseDown = false;
                },
                mouseleave: function(event){ //이벤트
                    if(!mouseDown){return;} //마우스다운이 아니면 강제종료
                    touchEnd = event.clientX;
                    result = touchStart-touchEnd > 0 ? 'NEXT' : 'PREV';
                    if(result==='NEXT'){
                        nextCount(); //다음슬라이드 호출
                    }
                    if(result==='PREV'){
                        prevCount(); //다음슬라이드 호출
                    }
                    // 드래그 앤드롭 끝났다
                    mouseDown = false;
      
                  },
                  mousemove: function(event){
                    if(!mouseDown){return;} //마우스다운이 아니면 강제종료
                    dragEnd = event.clientX;
                    $('#section1 .slide-wrap').css({left: dragEnd-dragStart }); //드래그 앤 드롭
                  }
            });

            //모바일 전용 터치 이벤트
            $('#section1 .slide-container').on({
                touchstart: function(event){
                  timerfn();
                  console.log(event);
                  touchStart = event.originalEvent.changedTouches[0].clientX;                        
                  dragStart =  event.originalEvent.changedTouches[0].clientX-$('.slide-wrap').offset().left-winW;  //반드시 초기값 0셋팅
                  mouseDown = true;
                },
                touchend: function(event){  
                    touchEnd = event.originalEvent.changedTouches[0].clientX;  
                    result = touchStart-touchEnd > 0 ? 'NEXT' : 'PREV';
                    if(result==='NEXT'){
                      if(!$('#section1 .slide-wrap').is(':animated')){
                        nextCount(); //다음슬라이드 호출
                      }                  
                    }
                    if(result==='PREV'){
                      if(!$('#section1 .slide-wrap').is(':animated')){
                        prevCount(); //다음슬라이드 호출
                      }
                    }
                    // 드래그 앤드롭 끝났다
                    mouseDown = false;
                },
                touchmove: function(event){
                    if(!mouseDown){return;} //마우스다운이 아니면 강제종료
                    dragEnd = event.originalEvent.changedTouches[0].clientX;
                    $('#section1 .slide-wrap').css({left: dragEnd-dragStart }); //드래그 앤 드롭
                }
            });

        }
        section2(){
            //스크롤이벤트
            //섹션 2번이 노출되면 패럴럭스 구현(추가 클래스 secAni)
            const sec2Top = $('#section2').offset().top-$(window).height();

            $(window).scroll(function(){
                if($(window).scrollTop()>sec2Top){
                    $('#section2').addClass('sec2Ani');
                    return;
                }
                if($(window).scrollTop()===0){
                    $('#section2').removeClass('sec2Ani');
                    return;
                }
            });
            
            
        }
        section3(){
            const sec3Top = $('#section3').offset().top-$(window).height();

            $(window).scroll(function(){
                if($(window).scrollTop()>sec3Top){
                    $('#section3').addClass('sec3Ani');
                    return;
                }
                if($(window).scrollTop()===0){
                    $('#section3').removeClass('sec3Ani');
                    return;
                }
            });
        }
        section4(){

            let idx = 0; //첫번째버튼 기본값
            let winW = $(window).width();
            let cols = 4;
            let imgW = winW/cols;
            let imgH = imgW*0.8125;

            let n = $('#section4 .gallery-item').length;
            let h = $('#section4 .gallery-item.hide').length;
            let rows = Math.ceil((n-h)/cols);

            let sec4Top=$('#section4').offset().top-$(window).height();
            let scr = false;

            $(window).scroll(function(){

                if($(window).scrollTop()===0){
                    scr=false;
                    $('#section4').removeClass('sec4Ani');
                }
    
                if($(window).scrollTop()>=sec4Top){
                    if(scr===false){
                        scr=true; //애니메이션 1회만 진행
                        $('#section4').addClass('sec4Ani');
                    }
                    
                }
            });

            setTimeout(galleryMain,100);

            // 반응형 윈도우 리사이즈
          $(window).resize(function(){
            galleryMain();
          });

          
            // 버튼클릭 이벤트
            $('#section4 .gallery-btn').each(function(index){
                $(this).on({
                    click: function(e){
                        e.preventDefault();
                        idx = index; 
                        galleryMain();
                        $('#section4 .gallery-btn').removeClass('on');
                        $(this).addClass('on');
                        $('#section4').removeClass('sec4Ani');
                    }
                });
            });

            // 메인갤러리함수
            function galleryMain(){
                winW = $(window).width();            

                if(winW>=1280){
                cols = 4;
                }
                else if(winW>=1024){
                cols = 3;
                }
                else if(winW>=600){
                cols = 2;
                }
                else {
                cols = 1; 
                }
                
                imgW = winW/cols;
                imgH = imgW*0.8125;

                $('#section4 .gallery-item').removeClass('zoom');
                $('#section4 .gallery-item').stop().animate({width:imgW,height:imgH}).removeClass('hide');
                $('#section4 .gallery-item .img-wrap').css({width:imgW});

                if(idx===0){
                    switch(cols){
                      case 4:
                          $('#section4 .gallery-item').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                          $('#section4 .gallery-item').eq(1).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                          $('#section4 .gallery-item').eq(2).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
                          $('#section4 .gallery-item').eq(3).show().stop().animate({left:imgW*3,top:imgH*0}, 300);
            
                          $('#section4 .gallery-item').eq(4).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                          $('#section4 .gallery-item').eq(5).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
                          $('#section4 .gallery-item').eq(6).show().stop().animate({left:imgW*2,top:imgH*1}, 300);
                          $('#section4 .gallery-item').eq(7).show().stop().animate({left:imgW*3,top:imgH*1}, 300);
                          break;
                      case 3:
                          $('#section4 .gallery-item').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                          $('#section4 .gallery-item').eq(1).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                          $('#section4 .gallery-item').eq(2).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
    
                          $('#section4 .gallery-item').eq(3).show().stop().animate({left:imgW*0,top:imgH*1}, 300);      
                          $('#section4 .gallery-item').eq(4).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
                          $('#section4 .gallery-item').eq(5).show().stop().animate({left:imgW*2,top:imgH*1}, 300);
    
                          $('#section4 .gallery-item').eq(6).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                          $('#section4 .gallery-item').eq(7).show().stop().animate({left:imgW*1,top:imgH*2}, 300);
                          break;
                      case 2:
                          $('#section4 .gallery-item').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                          $('#section4 .gallery-item').eq(1).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
            
                          $('#section4 .gallery-item').eq(2).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                          $('#section4 .gallery-item').eq(3).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
            
                          $('#section4 .gallery-item').eq(4).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                          $('#section4 .gallery-item').eq(5).show().stop().animate({left:imgW*1,top:imgH*2}, 300);
            
                          $('#section4 .gallery-item').eq(6).show().stop().animate({left:imgW*0,top:imgH*3}, 300);
                          $('#section4 .gallery-item').eq(7).show().stop().animate({left:imgW*1,top:imgH*3}, 300);                    
                          break;
                      default :
                          $('#section4 .gallery-item').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                          $('#section4 .gallery-item').eq(1).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                          $('#section4 .gallery-item').eq(2).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                          $('#section4 .gallery-item').eq(3).show().stop().animate({left:imgW*0,top:imgH*3}, 300);
                          $('#section4 .gallery-item').eq(4).show().stop().animate({left:imgW*0,top:imgH*4}, 300);
                          $('#section4 .gallery-item').eq(5).show().stop().animate({left:imgW*0,top:imgH*5}, 300);
                          $('#section4 .gallery-item').eq(6).show().stop().animate({left:imgW*0,top:imgH*6}, 300);
                          $('#section4 .gallery-item').eq(7).show().stop().animate({left:imgW*0,top:imgH*7}, 300);
                    }
                }
                else if(idx===1){
    
                  $('#section4 .gallery-item').eq(0).hide().addClass('hide');
                  $('#section4 .gallery-item').eq(2).hide().addClass('hide');
                  $('#section4 .gallery-item').eq(3).hide().addClass('hide');
                  $('#section4 .gallery-item').eq(4).hide().addClass('hide');
                  $('#section4 .gallery-item').eq(6).hide().addClass('hide');
    
                  switch(cols){
                    case 4:
                        $('#section4 .gallery-item').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                        $('#section4 .gallery-item').eq(5).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                        $('#section4 .gallery-item').eq(7).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
                        break;
                    case 3:
                        $('#section4 .gallery-item').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                        $('#section4 .gallery-item').eq(5).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                        $('#section4 .gallery-item').eq(7).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
                        break;
                    case 2:
                        $('#section4 .gallery-item').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                        $('#section4 .gallery-item').eq(5).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                        $('#section4 .gallery-item').eq(7).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                        break;
                    default:
                        $('#section4 .gallery-item').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                        $('#section4 .gallery-item').eq(5).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                        $('#section4 .gallery-item').eq(7).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                  }  
    
    
                }
                else if(idx===2){
    
                  $('#section4 .gallery-item').eq(3).hide().addClass('hide');
                  $('#section4 .gallery-item').eq(7).hide().addClass('hide');
                  
                  switch(cols){
                    case 4:
                        $('#section4 .gallery-item').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                        $('#section4 .gallery-item').eq(1).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                        $('#section4 .gallery-item').eq(2).show().stop().animate({left:imgW*2,top:imgH*0}, 300);           
                        $('#section4 .gallery-item').eq(4).show().stop().animate({left:imgW*3,top:imgH*0}, 300);
          
                        $('#section4 .gallery-item').eq(5).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                        $('#section4 .gallery-item').eq(6).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
                        break;
                    case 3:
                        $('#section4 .gallery-item').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                        $('#section4 .gallery-item').eq(1).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                        $('#section4 .gallery-item').eq(2).show().stop().animate({left:imgW*2,top:imgH*0}, 300);           
    
                        $('#section4 .gallery-item').eq(4).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                        $('#section4 .gallery-item').eq(5).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
                        $('#section4 .gallery-item').eq(6).show().stop().animate({left:imgW*2,top:imgH*1}, 300);
                        break;
                    case 2:
                        $('#section4 .gallery-item').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                        $('#section4 .gallery-item').eq(1).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
    
                        $('#section4 .gallery-item').eq(2).show().stop().animate({left:imgW*0,top:imgH*1}, 300);           
                        $('#section4 .gallery-item').eq(4).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
    
                        $('#section4 .gallery-item').eq(5).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                        $('#section4 .gallery-item').eq(6).show().stop().animate({left:imgW*1,top:imgH*2}, 300);
                        break;
                    default:
                        $('#section4 .gallery-item').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                        $('#section4 .gallery-item').eq(1).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                        $('#section4 .gallery-item').eq(2).show().stop().animate({left:imgW*0,top:imgH*2}, 300);           
                        $('#section4 .gallery-item').eq(4).show().stop().animate({left:imgW*0,top:imgH*3}, 300);
                        $('#section4 .gallery-item').eq(5).show().stop().animate({left:imgW*0,top:imgH*4}, 300);
                        $('#section4 .gallery-item').eq(6).show().stop().animate({left:imgW*0,top:imgH*5}, 300);
                  }  
    
                }
                else if(idx===3){
    
                  $('#section4 .gallery-item').eq(1).hide().addClass('hide');
                  $('#section4 .gallery-item').eq(3).hide().addClass('hide');
                  $('#section4 .gallery-item').eq(6).hide().addClass('hide');
                  $('#section4 .gallery-item').eq(7).hide().addClass('hide');
                  
                  switch(cols){
                    case 4:
                        $('#section4 .gallery-item').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                        $('#section4 .gallery-item').eq(2).show().stop().animate({left:imgW*1,top:imgH*0}, 300);            
                        $('#section4 .gallery-item').eq(4).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
                        $('#section4 .gallery-item').eq(5).show().stop().animate({left:imgW*3,top:imgH*0}, 300);
                        break;
                    case 3:
                        $('#section4 .gallery-item').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                        $('#section4 .gallery-item').eq(2).show().stop().animate({left:imgW*1,top:imgH*0}, 300);            
                        $('#section4 .gallery-item').eq(4).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
                        $('#section4 .gallery-item').eq(5).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                        break;
                    case 2:
                        $('#section4 .gallery-item').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                        $('#section4 .gallery-item').eq(2).show().stop().animate({left:imgW*1,top:imgH*0}, 300);            
                        $('#section4 .gallery-item').eq(4).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                        $('#section4 .gallery-item').eq(5).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
                        break;
                    default:
                        $('#section4 .gallery-item').eq(0).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                        $('#section4 .gallery-item').eq(2).show().stop().animate({left:imgW*0,top:imgH*1}, 300);            
                        $('#section4 .gallery-item').eq(4).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                        $('#section4 .gallery-item').eq(5).show().stop().animate({left:imgW*0,top:imgH*3}, 300);
                  }  
    
                }
                else if(idx===4){
    
                  $('#section4 .gallery-item').eq(0).hide().addClass('hide');
                  $('#section4 .gallery-item').eq(1).hide().addClass('hide');
                  $('#section4 .gallery-item').eq(2).hide().addClass('hide');
                  $('#section4 .gallery-item').eq(3).hide().addClass('hide');
                  $('#section4 .gallery-item').eq(5).hide().addClass('hide');
                  $('#section4 .gallery-item').eq(6).hide().addClass('hide');
    
                  
                  switch(cols){
                    case 4:
                        $('#section4 .gallery-item').eq(4).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                        $('#section4 .gallery-item').eq(7).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                        break;
                    case 3:
                        $('#section4 .gallery-item').eq(4).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                        $('#section4 .gallery-item').eq(7).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                        break;
                    case 2:
                        $('#section4 .gallery-item').eq(4).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                        $('#section4 .gallery-item').eq(7).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                        break;
                    default:
                        $('#section4 .gallery-item').eq(4).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                        $('#section4 .gallery-item').eq(7).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                  }  
    
                }
                else if(idx===5){
    
                  $('#section4 .gallery-item').eq(0).hide().addClass('hide');
                  $('#section4 .gallery-item').eq(2).hide().addClass('hide');
                  $('#section4 .gallery-item').eq(6).hide().addClass('hide');
                  
                  switch(cols){
                    case 4:
                        $('#section4 .gallery-item').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                        $('#section4 .gallery-item').eq(3).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                        $('#section4 .gallery-item').eq(4).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
                        $('#section4 .gallery-item').eq(5).show().stop().animate({left:imgW*3,top:imgH*0}, 300);
          
                        $('#section4 .gallery-item').eq(7).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                        break;
                    case 3:
                        $('#section4 .gallery-item').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                        $('#section4 .gallery-item').eq(3).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
                        $('#section4 .gallery-item').eq(4).show().stop().animate({left:imgW*2,top:imgH*0}, 300);
    
                        $('#section4 .gallery-item').eq(5).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                        $('#section4 .gallery-item').eq(7).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
                        break;
                    case 2:
                        $('#section4 .gallery-item').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                        $('#section4 .gallery-item').eq(3).show().stop().animate({left:imgW*1,top:imgH*0}, 300);
    
                        $('#section4 .gallery-item').eq(4).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                        $('#section4 .gallery-item').eq(5).show().stop().animate({left:imgW*1,top:imgH*1}, 300);
    
                        $('#section4 .gallery-item').eq(7).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                        break;
                    default:
                        $('#section4 .gallery-item').eq(1).show().stop().animate({left:imgW*0,top:imgH*0}, 300);
                        $('#section4 .gallery-item').eq(3).show().stop().animate({left:imgW*0,top:imgH*1}, 300);
                        $('#section4 .gallery-item').eq(4).show().stop().animate({left:imgW*0,top:imgH*2}, 300);
                        $('#section4 .gallery-item').eq(5).show().stop().animate({left:imgW*0,top:imgH*3}, 300);
                        $('#section4 .gallery-item').eq(7).show().stop().animate({left:imgW*0,top:imgH*4}, 300);
                  }  
    
                }
                
                h = $('#section4 .gallery-item.hide').length;
                rows = Math.ceil((n-h)/cols);  
                $('#section4 .gallery-wrap').stop().animate({height: imgH*rows }, 300);

                $('#section4 .gallery-item').addClass('zoom');
            }
        
        }
        section5(){

            const svgObj = $('#section5 .ring-front circle');
            let svgArr = [];//원형 svg 배열
            let perSize= [];
            let piece = [];
            let per = [.9,.75,.9,.62];
            let second = 3;
            let sum = [0,0,0,0];
            let setId = [0,0,0,0];

            let sec5Top = $('#section5').offset().top-$(window).height();
            let t = false;

            $(window).scroll(function(){
                if($(window).scrollTop()===0){
                    t=false;
                    $('#section5').removeClass('sec5Ani');
                    
                }
                if($(window).scrollTop()>sec5Top){
                    if(t===false){
                        t=true;
                        $('#section5').addClass('sec5Ani');
                        svgAnimation();
                    }
                    
                }
            });

            //svg 애니메이션
            //1. SVG 원형 총(Total) 길이(Length) 구하기
            // getTotalLength(); //svg 원형 객체의 총 길이를 px 단위로 구한다.
            //원형박스 선택자 자식요소 circle 그래픽 디자인 요소


            function svgAnimation(){

                sum = [0,0,0,0];

                $.each(svgObj,function(idx,obj){ //원형 4개 반복처리
                    svgArr[idx] = obj.getTotalLength(); //4개가 배열에 저장

                    $(obj).css({strokeDasharray: svgArr[idx]});
                    $(obj).css({strokeDashoffset: svgArr[idx]});
                    
                    //각 요소의 퍼센트 길이를 구한다.
                    perSize[idx]=svgArr[idx] * per[idx];

                    //각 요소의 토막(마디)의 길이를 구한다
                    piece[idx] = (perSize[idx]/second)/100;

                    //마디를 카운트 타이머 이용
                    function sumfn(){
                        sum[idx] += piece[idx];
                        if(sum[idx]>perSize[idx]){
                            clearInterval(setId[idx]);
                        }
                        else{
                            $(obj).css({strokeDashoffset: svgArr[idx]-sum[idx]});
                            $('#section5 .count-num').eq(idx).html(Math.ceil(sum[idx]/svgArr[idx]*100)+'%');
                        }
                        
                    }

                    setId[idx] = setInterval(sumfn,10);
                    
                });
            }
            

            
            
        }
        section6(){
            //패럴럭스
            let winH = $(window).height();
            let sec6Top = $('#section6').offset().top-winH;
            let t =false;

            $(window).scroll(function(){
                if($(window).scrollTop()===0){
                    t=false;
                    $('#section6').removeClass('sec6Ani');
                }
                if($(window).scrollTop()>sec6Top){
                    if(t===false){
                        t=true;
                        $('#section6').addClass('sec6Ani');
                    }
                }
            });
        }
        section7(){
            let winH = $(window).height();
            let sec7Top= $('#section7').offset().top-winH;

            $(window).scroll(function(){
                if($(window).scrollTop()>sec7Top){
                    $('#section7').addClass('sec7Ani');

                }
                if($(window).scrollTop()===0){
                    $('#section7').removeClass('sec7Ani');
                }
            });
            
        }
        section8(){
            let winH = $(window).height();
            let sec8Top= $('#section8').offset().top-winH;

            $(window).scroll(function(){
                if($(window).scrollTop()>sec8Top){
                    $('#section8').addClass('sec8Ani');

                }
                if($(window).scrollTop()===0){
                    $('#section8').removeClass('sec8Ani');
                }
            });
        }
        section9(){
            let winH = $(window).height();
            let sec9Top= $('#section9').offset().top-winH;

            $(window).scroll(function(){
                if($(window).scrollTop()>sec9Top){
                    $('#section9').addClass('sec9Ani');

                }
                if($(window).scrollTop()===0){
                    $('#section9').removeClass('sec9Ani');
                }
            });
        }
        footer(){
            
        }
        quick(){
            //스크롤 시 따라다니는 메뉴
            let quickTop = ($(window).height()-$('#quickBox').height())/2-200;
            //console.log(quickTop);
            
            $(window).scroll(function(){
                $('#quickBox').stop().animate({top: quickTop+$(window).scrollTop()},500);
            });
        }
        gotop(){
            $(window).scroll(function(){
                if($(window).scrollTop()>100){
                    $('#goTopBox').stop().fadeIn(1000);
                }
                else{
                    $('#goTopBox').stop().fadeOut(1000);
                }
            });

            //맨 위로 부드럽게 이동: 스무스 스크롤링
            $('.gotop-btn').on({
                click: function(){
                    $('html,body').stop().animate({scrollTop: 0 }, 500);
                }
            });
        }
    }
    const newPofo = new Pofo();
    newPofo.init();

})(jQuery);