var rct,r1,l1,sp,i,gr,st,m,k,c,flg,flr,z,d,l,ch,p,r,w,t,g,h,it;
var rbt,lbt,rt,sbt,tbt,hbt,sht;
var ri0,ri1,ri2,fi1,fi2,sti1,sti2,rcts,r1s,l1s,sts,gri;
function preload(){
  ri0=loadImage('rockets2.png');
  ri1=loadImage('rockets1.png');
  i=loadImage("track1.jpg");
  ri2=loadImage('rockets0.png');
  fi1=loadImage('rocket.png');
  fi2=loadImage('rocket1.png');
  sti0=loadImage("image1.png");
  sti1=loadImage('mys0.png');
  sti2=loadImage("image.png");

  //need a proper launchpad
  //sound will be good but can be optional
  gri=loadImage("launcher (2).png");
}

function setup(){
  createCanvas(1366,768*145/182);
  rct=createSprite(width/2,Math.round(height/2),Math.round(width/22),Math.round(height/3));
  gr=createSprite(width/2,height*29/31,width,4/31*height);gr.visible=false;
  st=createSprite(rct.x,rct.y,rct.width,rct.height/2);
  flg=createSprite(width/5,rct.y+5/62*height,Math.round(width/6.83),Math.round(height*7/124));
  flg.shapeColor="green";
  flr=createSprite(flg.x-flg.width/2,flg.y,0,Math.round(height*7/124));
  flr.shapeColor="red";
  r1=createSprite(rct.x+rct.width,height,Math.round(rct.width/1.5),Math.round(rct.height/1.5));
  l1=createSprite(rct.y-rct.width,height,Math.round(rct.width/1.5),Math.round(rct.height/1.5));
  r1.shapeColor=l1.shapeColor="red";

  //skin sprites
  rct.visible=false;
  l1.visible=false;
  r1.visible=false;
  st.visible=false;
  sts=createSprite(rct.x,rct.y,rct.width,rct.height/2);
  rcts=createSprite();
  l1s=createSprite();
  r1s=createSprite();

  console.log(" up/w for take off, a/left for left, d/right for right, r for reset, h for activate and g for seperate, space for launch, Enjoy");
  
  //control variables
  m=1;k=1;c=0;z=0;d=0;l=0;ch=0;sp=0;p=0;w=0;g=0;it=0;h=0;t=false;

  //buttons
  {
  rbt=createButton("<-left");
  rbt.position(width/2-width/8,8*height/9);
  rbt.style('font-size','30px');
  rbt.mousePressed(function(){
    if(m!=0&&w!=1){
      rct.rotation-=5;}
  });

  lbt=createButton("right->");
  lbt.position(width/2+width/16,8*height/9);
  lbt.style('font-size', '30px');
  lbt.mousePressed(function(){
    if(m!=0&&w!=1){
    rct.rotation+=5;}
  });

  tbt=createButton("thrusters");
  tbt.position(width/2-width/20,8*height/9);
  tbt.style('font-size', '30px');
  tbt.mousePressed(function(){
  if(t==false){
    t=true;}else{t=false;}
    thrust();
  });

  sbt=createButton("separate");
  sbt.position(width/5,8*height/9);
  sbt.style('font-size', '30px');
  sbt.mousePressed(function(){
    g=1;
  });

  rt=createButton("reset");
  rt.position(width/2-width/30,5*height/8);
  rt.style('font-size', '30px');
  rt.mousePressed(function(){
    z=0;m=1;
    rct.x=width/2;
    camera.position.y=height/2-height/124;
    k=1;d=1;l=0;ch=0;sp=0;g=0;h=0;p=0;
    rct.rotation=0;
    rcts.addImage(ri0);rcts.scale=0.6;
    sts.visible=true;
    t=false;
    w=0;rt.hide();
  });
  rt.hide();

  hbt=createButton("activate");
  hbt.position(width/9,8*height/9);
  hbt.style('font-size', '30px');
  hbt.mousePressed(function(){
    h=1;
  });
  hbt.hide();

  sht=createButton("launch");
  sht.position(7*width/9,8*height/9);
  sht.style('font-size', '30px');
  sht.mousePressed(function(){
      if((camera.position.y<=-height*36||k==0)&&(rct.rotation%360==45||rct.rotation%360==-315)&&rct.x<=width/3){
      p=1;
      k=0;}
  });
}
  r=Math.round(((height/64*width/64)**1/2));
}

function up(){

//instructions
{
  if(it==0&&t==false&&!keyDown("w")&&!keyDown(UP_ARROW)&&!keyDown("space")&&m==1){
    textSize(Math.round((width/100*height/100)**1/3));
    fill("yellow");
    text("Welcome pilot,",width/2-width/20,height/4);
    text("You have to launch the shuttle in a g(0) orbit.To reach there use the thrusters, for take off and seperate when the fuel tanks are empty only.The onboard computer will assist you.Good luck!",width/5,height/3.7,3*width/5,3*height/3.7);
  }else{it=1;}
  if((sp==1&&p==1&&k==0&&st.x<=width/2&&st.y>=-height*36.5&&st.y<=-height*36&&st.rotation%360==78)){
    sts.addImage(sti2);sts.scale=0.3;
    textSize(Math.round(width/128*height/64)**1/3);
    fill("yellow");
    text("Mission complete",width/2-width/15,rct.y-height/5-9/124*height*Math.abs(Math.sin(rct.rotation%180/180*PI)));
    w=1;
  }
}

  //borders for the rocket
{
  if(rct.x<=Math.abs((Math.cos(90-Math.atan(rct.height/rct.width)+rct.rotation%90)/90*PI/2)*Math.pow((rct.width**2+rct.height**2),0.5))+75){
    rct.x=Math.abs((Math.cos(90-Math.atan(rct.height/rct.width)+rct.rotation%90)/90*PI/2)*Math.pow((rct.width**2+rct.height**2),0.5))+75;    
  }
  if(rct.x>=width-Math.abs((Math.cos(90-Math.atan(rct.height/rct.width)+rct.rotation%90)/90*PI/2)*Math.pow((rct.width**2+rct.height**2),0.5))-75){
    rct.x=width-Math.abs((Math.cos(90-Math.atan(rct.height/rct.width)+rct.rotation%90)/90*PI/2)*Math.pow((rct.width**2+rct.height**2),0.5))-75;    
  }
}

  //skins of the rocket,satellite,fuel tanks
  rcts.x=rct.x;rcts.y=rct.y;
  rcts.rotation=rct.rotation;
  if(t==true&&flr.width<=198){
    rcts.addImage(ri1);rcts.scale=0.6;
  }else if(k!=0){rcts.addImage(ri0);rcts.scale=0.6;}

  l1s.x=l1.x;l1s.y=l1.y;
  l1s.rotation=l1.rotation;
  r1s.x=r1.x;r1s.y=r1.y;
  r1s.rotation=r1.rotation;
  if(t==true&&g==0){
    r1s.addImage(fi2);r1s.scale=0.6;l1s.addImage(fi2);l1s.scale=0.6;
  }else{l1s.addImage(fi1);l1s.scale=0.6;r1s.addImage(fi1);r1s.scale=0.6;}

  sts.x=st.x;sts.y=st.y;
  sts.rotation=st.rotation;

  //at g=0 free fall state
{
  if(Math.abs(Math.round(gr.width*gr.height/(rct.y-4*gr.y)/3))-d==0&&sp==0&&camera.position.y<=-height*36){
    textSize(Math.round((width/105*height/105)**1/3));
    fill("white");
    text("g(0) achieved",rct.x-width/20,camera.position.y+27/124*height-height/3);
    text("activate sequence",rct.x-width/15,camera.position.y+27/124*height-height/2.75);
    hbt.show();
    if(keyDown("h")||h==1){
      sp=1;
    }
  }else{if(sp!=1&&h==0){hbt.hide();}}
  if(sp==1){
    if(camera.position.y<=-height*36){
      rct.x+=Math.round((width/4-rct.x)/25);
      if(rct.x<=width/3){
        if(rct.rotation%360==45||rct.rotation%360==-315){
          if(p==0){
            fill("yellow");
            textSize(Math.round((width/105*height/105)**1/3));
            text("Launch the satellite",width/2-width/15,camera.position.y+27/124*height-height/4);
            if(keyDown("space")){p=1;}
          }
        }else{ 
          if(p!=1){
            fill("white");
            textSize(Math.round((width/105*height/105)**1/3));
            text("rotate rocket to align near 45",rct.x,rct.y-height/3);}
        }
      }
    }
  }

  if(camera.position.y<=-height*36){
    camera.position.y=-height*36;
    if(rct.x<=width/3){
      if(k==0){
      rcts.addImage(ri2);rcts.scale=0.6;
      if(w!=1){sts.addImage(sti0);sts.scale=0.3;}
      st.x+=Math.round(Math.round((width/2-st.x)/25));
      st.y-=Math.round(Math.round((st.y+height*36.25)/25));
      st.rotation+=Math.round((90-st.rotation%90)/25);
     }
    }
  }
}

  //satellite normal position
{
  if(k==1||camera.position.y!=-height*36&&k!=0){
    sts.addImage(sti1);sts.scale=0.3;
    st.rotation=rct.rotation;
    st.y=rct.y-st.height/2*Math.cos(rct.rotation%360/360*2*PI);
    st.x=rct.x+st.width/2*Math.sin(rct.rotation%360/360*2*PI);
  }  
}

  //gravity and camera and relative rocket position
{
  if(camera.position.y>=height/2){
    camera.position.y=height/2;
  }else{
    camera.position.y+=Math.abs(Math.round(gr.width*gr.height/(rct.y-4*gr.y)/3))-d;
  }
  if((flr.width<=198||camera.position.y<=-height*36)||(k==0)){
    d=1;sts.visible=true;
  }else{d=-3;sts.visible=false;}

   rct.y=camera.position.y+27/124*height+9/124*height*Math.abs(Math.sin(rct.rotation%180/180*PI));
}

  //booster module and thrust updates and separation
{
  if(z>325&&ch==0&&m!=0){
    fill("blue");
    textSize(Math.round(width/128*height/64)**1/3);
    var nm=Math.round((475-z)/5);
    if(nm>=1){
    text("Separate fuel tanks in "+nm,width/2-width/8,rct.y-height/3.5);
    }else{text("!! separate !!",width/2-width/20,rct.y-height/3.5);}
  }
  if((!keyWentDown("g")&&g==0&&m==1)){
  r1.y=rct.y+rct.height/4*Math.sin((rct.rotation%360)/360*2*PI);
  l1.y=rct.y-rct.height/4*Math.sin((rct.rotation%360)/360*2*PI);
  r1.x=rct.x+rct.width/1.25*Math.cos((rct.rotation%360)/360*2*PI);
  l1.x=rct.x-rct.width/1.25*Math.cos((rct.rotation%360)/360*2*PI);
  r1.rotation=rct.rotation;
  l1.rotation=rct.rotation;
  }
  else{
    g=1;
    if(Math.abs(Math.round(gr.width*gr.height/(rct.y-4*gr.y)/3))<=6){
      m=1.5;
    }else{
      if(m!=0){
      m=0.75;
      if(l==0&&z<=500&&ch==0){
      z=500;l=1;}
      }
    }
    ch=1;
    if(r1.y<gr.y-r1.width/2-gr.height/2&&l1.y<gr.y-l1.width/2-gr.height/2){
      r1.y+=Math.abs(Math.round(gr.width*gr.height/(rct.y-4*gr.y)/3))-d;
      r1.rotation+=4;r1.x+=0.75;
      l1.y+=Math.abs(Math.round(gr.width*gr.height/(rct.y-4*gr.y)/3))-d;
      l1.rotation-=4;l1.x-=0.75;
    }else{
      r1.rotation=90;l1.rotation=-90;
      r1.y=gr.y-(r1.width+gr.height)/2;
      l1.y=gr.y-(l1.width+gr.height)/2;}
  }
}

  //fuel
{
  flg.y=rct.y-4/7*height-9/124*height*Math.abs(Math.sin(rct.rotation%180/180*PI));
  flr.y=flg.y;
  c=Math.round(map(z,0,1200,1,Math.round(width/6.83),true));
  flg.x=173/1366*width+flr.width+flg.width/2;
  flg.width=Math.round(width/6.83)-flr.width;
  flr.width=c;
  flr.x=flg.x-flg.width/2-flr.width/2;
  rectMode(CENTER);
  strokeWeight(4);
  rect(width/5,flg.y,Math.round(width/6.83),Math.round(height*7/124));
  textSize(Math.round(width/128*height/64)**1/3);
  if(c<=198){
    fill("green");
    text("fuel gauge:",width/5-31/683*width,flg.y-height/20);
  }else{
    fill("red");
    if(m!=0){
    text("!!Out of fuel!!",width/5-40/683*width,flg.y-height/24);}
    else{text("!!damage!!",width/5-width/20,flg.y-height/20);}
  }
}

//Reset state
{
  if(w==1){
    rt.show();
  }
}

  //rotation display
{
  strokeWeight(2);
  if(m!=0){
  fill("lightblue");
  ellipse(3*width/4,flg.y+height/25,r,r);
  text("alignment: "+((rct.rotation)%360),3*width/4-width/20,flg.y-height/19);
  fill(color(255,172,0));
  ellipse(3*width/4,flg.y+height/25,r/2,r/2);
  }else{  
  fill("red");
  text("!!damage!!",3*width/4-width/20,flg.y-height/20);
  ellipse(3*width/4,flg.y+height/25,r,r);
  ellipse(3*width/4,flg.y+height/25,r/2,r/2);
}
  noFill();
  beginShape();{
    vertex(3*width/4,flg.y+height/25);
    vertex(3*width/4-r/2*Math.cos(rct.rotation%360/360*2*PI+PI/2),flg.y+height/25-r/2*Math.sin(rct.rotation%360/360*2*PI+PI/2));
    vertex(3*width/4,flg.y+height/25);
    vertex(3*width/4-r/2*Math.cos(PI/2),flg.y+height/25-r/2*Math.sin(PI/2));
  }endShape(CLOSE);
}

}

function draw() {
  background(0,0,0);
  image(i,0,-height*36.5,width,height*37.5);
  imageMode(CENTER);
  image(gri,width/2,7*height/14.75,500,700);

  if((keyDown("w")||keyDown(UP_ARROW))&&flr.width<=198&&w!=1){
    t=true;
  }if(keyWentUp("w")||keyWentUp(UP_ARROW)){t=false;}

  if((keyDown("d")||keyDown(RIGHT_ARROW))&&m!=0&&w!=1){
    rct.rotation+=5;
  }
  if((keyDown("a")||keyDown(LEFT_ARROW))&&m!=0&&w!=1){
    rct.rotation-=5;
  }
  if(keyDown("r")){
    z=0;m=1;
    rct.x=width/2;
    camera.position.y=height/2-height/124;
    k=1;d=1;l=0;ch=0;sp=0;g=0;h=0;p=0;
    rct.rotation=0;
    rcts.addImage(ri0);rcts.scale=0.6;
    sts.visible=true;
    t=false;
    w=0;rt.hide();
  }
  if(keyDown("Space")&&m!==0){
    if((camera.position.y<=-height*36||k==0)&&p==1){
    k=0;}
    else{
      if(sp==0&&camera.position.y>-height*36){
      fill("red");    
      textSize(Math.round((width/105*height/105)**1/3));
      text("Not in position",rct.x-width/20,rct.y-height/3);}
      }
  }
  if(((rct.isTouching(gr)||gr.y-rct.y<=Math.round(90/612*height))&&flg.width<198&&z!=0)||m==0){
      z+=(1191-z);
      m=0;w=1;
      {
      fill("red");    
      textSize(Math.round((width/105*height/105)**1/3));
      text("Rocket crashed",rct.x-width/16,rct.y-height/3);
      noFill();
      fill("yellow");
      textSize(Math.round((width/100*height/100)**1/2));
      text("Game Over",width*13/30,height/4);
      }
  }
  thrust();
  up();
  drawSprites();
}

function thrust(){
  if(t==true&&flr.width<=198&&w!=1){
  camera.position.y-=m*height/31*Math.cos((rct.rotation%360)/360*2*PI);
  rct.x+=height/31*Math.sin((rct.rotation%360)/360*2*PI);
  z++;}
}