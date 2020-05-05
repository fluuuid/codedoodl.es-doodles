// Copyright (c) 2015 Diego Montoya diego_montoya@outlook.com

atom a;
ArrayList atoms;
spacegrid grid;
int ADragging = -1;
color bkgColor;
Boolean darkTheme = false;
PFont font;

void setup () {
  frameRate(60);
  size(window.innerWidth, window.innerHeight, P2D);
  a = new atom(320, 240, false);
  atoms = new ArrayList();
  atoms.add(a);
  ADragging = atoms.size() - 1;
  grid = new spacegrid(42, int(round(42.0/width*height)));
  colorMode(HSB, 100);
  background(0);
  bkgColor = color(0, 0, 100, 20);
  smooth();
}

void draw() {
  noStroke();
  fill(bkgColor);
  rect(0, 0, width, height);
  
  grid.resetGrid();
  for (int i = 0; i < atoms.size (); i++) {
    atom tempA = (atom) atoms.get(i);
    grid.setGridPointPosition(tempA.xOsc, tempA.yOsc, 0, tempA.gravity);
  }
  grid.drawGrid();
  
  for (int i = atoms.size () - 1; i >= 0; i--) {
    atom tempA = (atom) atoms.get(i);
    tempA.drawAtom();
  }
  atom tempA = (atom) atoms.get(ADragging);
  dragAtom(tempA);
  
}

void dragAtom(atom A) {
  A.x = mouseX * 0.1 + A.x * 0.9;
  A.y = mouseY * 0.1 + A.y * 0.9;
  A.dragged = true;
  A.osc = false;
}

void mouseReleased() {
  atom a = (atom)atoms.get(ADragging);
  if (mouseButton == RIGHT) {
    a.gravityMax *= -1;
    a.gravitySign *= -1;
    return;
  }
  a.dragged = false;
  a.osc = true;
  atom tempA = new atom(mouseX, mouseY, (random(1) > 0.5 ? true : false));
  //  atom tempA = new atom(mouseX, mouseY, ( ? true : false));
  tempA.drawAtom();
  ADragging = atoms.size();
  atoms.add(tempA);
  dragAtom(tempA);
}

void keyPressed() {
  if (keyCode == 32) {
    darkTheme = !darkTheme;
    if (!darkTheme) {
      bkgColor = color(0, 0, 100, 20);
    } else {
      bkgColor = color(0, 0, 0, 10);
    }
  }
}

// Copyright (c) 2015 Diego Montoya diego_montoya@outlook.com

/* atom class */
int zFrames = 30;
int zoomingCount = zFrames;

class atom {
  float x, y;
  float oldX, oldY;
  float awayX, awayY;
  float xOsc;
  float yOsc;
  String ownMode;
  int aura = 0;

  int trans;

  float alph, beta, gamma;
  float speed;

  float radius, sqrRadius;
  final float defaultR = 0; //40
  float oldRadius, oldSqrRadius;

  boolean osc;
  boolean dragged = false;
  float gravity;
  float gravitySign;
  float gravityMax;

  atom(int x, int y, boolean posG) {
    this.x = x;
    this.y = y;
    this.gravityMax = random(0.9, 1.5);
    this.gravity = 0;
    this.gravitySign = 1;
    if (!posG) {
      this.gravityMax *= -1;
      this.gravitySign *= -1;
    }
    trans = 200;
    radius = defaultR;
    sqrRadius = radius * radius;
    osc = true;
    alph = random(TWO_PI);
    beta = random(TWO_PI);
    gamma = random(0.7, 0.9);
    speed = random (0.03, 0.06);
    if (random(1) > 0.5)
      speed *= -1;
    ownMode = "all";
  }

  float magn = 40;
  void drawAtom() {
    if (gravitySign == 1) {
      if (gravityMax > gravity) {
        gravity += (gravityMax - gravity) * 0.3;
      }
    } else {
      if (gravityMax < gravity) {
        gravity += (gravityMax - gravity) * 0.3;
      }
    }
    if (osc) {
      xOsc = x + (magn * cos(alph));
      yOsc = y + (magn * cos(beta));
      alph = alph + speed;
      beta = beta + speed * gamma;
    } else {
      xOsc = x;
      yOsc = y;
      alph = HALF_PI;
      beta = HALF_PI;
    }
  }

  void setOsc() {
    osc = true;
  }

  void clearOsc() {
    osc = false;
  }

  void toggleOsc() {
    if (osc == true) {
      osc = false;
    } else {
      osc = true;
    }
  }

}

// Copyright (c) 2015 Diego Montoya diego_montoya@outlook.com

class spacegrid{
  float px[], py[];// defaultpx[], defaultpy[];
  int defaultGridCalculated = 0;
  int gridPointsX, gridPointsY, gridPoints;
  float gain = 1, offsetX = 0, offsetY = 0;
  float zoomCenterX, zoomCenterY;
  String ownMode = "all";
  float[] pathZoom = new float[60 * 2];
  int zoomingCount = zFrames;
  
  float factor = width / 640;
  
  spacegrid(int gridPointsX, int gridPointsY){
//    print("\n" + gridPointsY);
    this.gridPointsX = gridPointsX + 1;
    this.gridPointsY = gridPointsY + 1;
    gridPoints = this.gridPointsX * this.gridPointsY;
 
    px = new float[gridPoints];
    py = new float[gridPoints];
    factor = width / 640.0;
    
  } // end constructor
  
  
  void setGridPoint(int index, float x, float y){
    px[index] = x;
    py[index] = y;
  } // end void setGridPoint()
  
  
  void resetGrid(){
    calculateDefaultGrid();
  } // end void
  
  void calculateDefaultGrid () {
    for(int i = 0; i < gridPointsY; i++){
      for(int j = 0; j < gridPointsX; j++){
        px[(i+0) * gridPointsX + (j+0)] = float(width + 100) * float(j) / float(gridPointsX - 1) - 50;
        py[(i+0) * gridPointsX + (j+0)] = float(height + 100) * float(i) / float(gridPointsY - 1) - 50;
      }
    }   
  }
  
  void setGridPointPosition( float gravityX, float gravityY,
                             float radius, float gravity){
    for(int i = 0; i < gridPoints; i++){
      float dx = gravityX - px[i];
      float dy = gravityY - py[i];
      float dis = sqrt(sq(dx) + sq(dy)) / factor / gravity;
      float normdx = dx / dis;
      float normdy = dy / dis;
      if (gravity > 0){
        px[i] += dx * exp(-dis*dis/3000);
        py[i] += dy * exp(-dis*dis/3000);
      }else{
        px[i] -= dx * exp(-dis*dis/3000);
        py[i] -= dy * exp(-dis*dis/3000);
      }
    } // end for i
  } // end void setGridPointPositionZ
    
  void drawGrid(){
    strokeWeight(2);
    stroke(120/3.6, 50, 25);
    noFill();
    
    float alpaChannel;
        
    for(int i = 0; i < gridPointsY-1; i++){
      beginShape();
      for(int j = 0; j < gridPointsX-1; j++){
        float x1 = px[ (i+0) * gridPointsX + (j+0)];
        float y1 = py[ (i+0) * gridPointsX + (j+0)];
  
        float x2 = px[ (i+1) * gridPointsX + (j+0)];
        float y2 = py[ (i+1) * gridPointsX + (j+0)];
        
        float x3 = px[ (i+1) * gridPointsX + (j+1)];
        float y3 = py[ (i+1) * gridPointsX + (j+1)];
        
        float x4 = px[ (i+0) * gridPointsX + (j+1)];
        float y4 = py[ (i+0) * gridPointsX + (j+1)];

        vertex(x1, y1);
        vertex(x2, y2);
        vertex(x1, y1);
        vertex(x4, y4);

        //noStroke();
        //beginShape(TRIANGLE_STRIP); vertex(x1, y1, z1); vertex(x2, y2, z2); vertex(x4, y4, z4); vertex(x3, y3, z3); endShape();
      } // end for j 
      endShape();
    } // end for i
    
  } // end void drawGrid()
  
} // end class Grid

