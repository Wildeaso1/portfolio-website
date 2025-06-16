export const projectAlienAbductors = {
    id: 2,
    title: 'Alien Abductors',
    description: "Alien Abductors is a clone of Space Invaders, the clone follows the same principle with a different art-style.",
    headerImage: '',
    images: [],
    tags: ['Javascript', 'Game', '2D', 'Photoshop'],
    tools: ['Javascript', 'Photoshop', 'Gitlab'],
    toolIcons: ['Javascript', 'Photoshop', 'Gitlab'],
    subpages: [
        {
            id: 1,
            title: 'Enemy',
            description: 'Below are some of the fundemental code snippets about the enemy. Most notable the enemy movement which takes care of moving the enemies. The other script is the enemy initilization, which takes care of initilizing the enemies on a grid pattern.',
            images: [ '/images/features/feature1-main.jpg', '/images/features/feature1-detail1.jpg', '/images/features/feature1-detail2.jpg' ],
            codeSnippets: [
                {
                    title: 'Enemy Movement',
                    description: null,
                    language: 'javascript',
                    snippet: 
`function enemyMovement() {
    let reverseDirection = false;

    if (GverticalMove) {
        GverticalMoveTimer--;

        for (let i = 0; i < Enemies.length; i++) {
            let enemy = Enemies[i];

            if ((enemy.posY <= 50 && GverticalMoveSpeed < 0) ||
                (enemy.posY >= enemyMaxY && GverticalMoveSpeed > 0)) {
                GverticalMove = false;
                GverticalMoveSpeed = 0;
                break;
            }
            enemy.posY += GverticalMoveSpeed;
        }

        if (GverticalMoveTimer <= 0) {
            GverticalMove = false;
            GverticalMoveSpeed = 0;
        }
    } else {
        if (random(1) < 0.01) {
            GverticalMove = true;
            GverticalMoveSpeed = random([-1, 1]);
            GverticalMoveTimer = 60;
        }
    }

    for (let i = 0; i < Enemies.length; i++) {
        let enemy = Enemies[i];
        let enemyColor = color(enemy.RVal, enemy.GVal, enemy.BVal, enemy.AVal);
        fill(enemyColor);
        circle(enemy.posX, enemy.posY, 40);

        enemy.posX += enemy.moveSpeed * EnemyDirection;
        if (enemy.posX > width - 200 || enemy.posX < 0) {
            reverseDirection = true;
        }
    }

    if (reverseDirection) {
        EnemyDirection *= -1;
    }
}`
                },
                {
                    title: 'Enemy Initialization',
                    description: null,
                    language: 'javascript',
                    snippet: 
`function InitEnemies() {
    let enemySpacingX = 50;
    let enemySpacingY = 50;
    let numRows = 3;
    let numEnemiesRow = 5;

    for (let row = 0; row < numRows; row++) {
        for (let i = 0; i < numEnemiesRow; i++) {
            let enemy = {
                posX: enemyPosX + i * enemySpacingX,
                posY: enemyPosY + row * enemySpacingY,
                moveSpeed: enemyMovespeed,
                RVal: 255,
                GVal: 0,
                BVal: 0
            };
            Enemies.push(enemy);
        }
    }
}`
                }
            ]
        }
    ]
};