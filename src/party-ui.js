import { LitElement, html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";

export class PartyUI extends DDD {

  static get tag() {
    return 'party-ui';
  } 

  constructor() {
    super();
    this.players = ["You", "ENTER"];
    this.numChar = 1;
    this.startIndex = 0;
    this.ablaze = false;
    this.backArrowBool = false;
    this.forwardArrowBool = false;
    this.fireText = "> FIRE IN THE HOLE!";
    this.errorText = "";
    this.successText = "";
    this.hatList = [
      "bunny",
      "coffee",
      "construction",
      "cowboy",
      "education",
      "knight",
      "ninja",
      "party",
      "pirate",
      "watermelon",
    ];
  }

  static get styles() {

    return css`

      :host {
        display: flex;
        background-image: var(--background-image-url, url(
          "https://static.vecteezy.com/system/resources/previews/009/877/699/non_2x/pixel-art-night-sky-background-with-clouds-and-stars-for-game-8-bit-vector.jpg"
        ));
        background-repeat: no-repeat;
        background-size: cover;
        justify-content: center; 
        align-items: center; 
        height: 100vh;
      }

      /* Background changes when ablaze is set to true */
      :host([ablaze]) .darkbg {
        background-image: url("https://media4.giphy.com/media/WE066ErCk0Z91fLgaJ/giphy.gif?cid=6c09b952q3jdeclmtmluith4nr4mwfbf680vn9j9qmr8c6pz&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s");
        background-repeat: no-repeat;
        background-size: cover;
        background-color: #420300;
        border-color: var(--ddd-theme-default-roarGolden);
      }
      :host([ablaze]) .lightbg {
        background-color: #610601;
        border-color: var(--ddd-theme-default-roarGolden);
      }

      /* If forward and back arrow are able to be used, this change occurs */
      :host([backArrowBool]) .backarrow {
        opacity: 1;
        color: white;
      }
      :host([forwardArrowBool]) .forwardarrow {
        opacity: 1;
        color: white;
      } 
      :host([backArrowBool]) .backarrow:focus {
        animation: blinker .5s linear infinite
      }   
      :host([backArrowBool]) .backarrow:hover {
        animation: blinker .5s linear infinite
      }   
      :host([forwardArrowBool]) .forwardarrow:focus{
        animation: blinker .5s linear infinite;
      }
      :host([forwardArrowBool]) .forwardarrow:hover{
        animation: blinker .5s linear infinite;
      }

      /* ignore this it's a secret :) */
      .secret {
        position: relative;
        top: 100px;
        left: 188px;
        
        padding: 5px;
        border: transparent;
        background-color: transparent;
        color: white;
      }

      .lightbg {
        background-color: var(--ddd-theme-default-nittanyNavy);
        padding: var(--ddd-spacing-4);
        height: 525px;
        width: 975px;
        display: flex;
        border: 3px solid var(--ddd-theme-default-slateLight);

        flex-direction: column;
        align-items: center;
        overflow: hidden;
      }

      .darkbg {
        background-color: var(--ddd-theme-default-beaverBlue);
        height: 510px;
        width: 925px;
        margin-top: var(--ddd-spacing-4);
        padding: var(--ddd-spacing-4);
        border: 3px solid var(--ddd-theme-default-skyMaxLight);
      }

      .addbtn {
        border: var(--ddd-spacing-1) dashed white;
        padding: var(--ddd-spacing-3) var(--ddd-spacing-3);
        text-align: center;
        color: white;
        font-family: "Press Start 2P", system-ui;
        margin-right: var(--ddd-spacing-6);
        background-color: transparent;

        transition: .3s all ease-in-out;
      }

      .addsymbl {
        margin: var(--ddd-spacing-6);
        font-size: 50px;
        font-family: "Press Start 2P", system-ui;
      }
      
      .numchar {
        font-size: 18px;
        font-family: "Press Start 2P", system-ui;
      }

      .charlist {
        display: flex;
        justify-content: center;
      }

      .chars {
        text-align: center;
      }

      .character-wrapper {
        margin-bottom: var(--ddd-spacing-3);
      }

      .nametf {
        background: transparent;
        color: white;
        font-family: "Press Start 2P", system-ui;
        text-align: center;
        border: transparent;
        font-size: 25px;
        width: 150px;
        margin-top: var(--ddd-spacing-4);
        outline: none;
      }

      .nameline {
        border-top: var(--ddd-spacing-1) solid var(--ddd-theme-default-limestoneGray);
        margin: var(--ddd-spacing-0) var(--ddd-spacing-5);
      }

      .btnwrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: var(--ddd-spacing-3);
      }

      .savebtn {
        background: transparent;
        border: transparent;
        color: white;
        font-size: 15px;
        font-family: "Press Start 2P", system-ui;
      }

      .removebtn {
        margin-top: var(--ddd-spacing-4);
        background: transparent;
        border: transparent;
        color: white;
        font-size: 15px;
        font-family: "Press Start 2P", system-ui;
      }

      .bottombtnwrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        height: 40%;
      }
      
      .title,
      .finishbtn,
      .firebtn {
        text-align: center;
        margin-top: var(--ddd-spacing-8);
        background: transparent;
        border: transparent;
        color: white;
        font-size: 30px;
        font-family: "Press Start 2P", system-ui;
      }

      .errorText,
      .successText {
        text-align: center;
        font-size: 30px;
        font-family: "Press Start 2P", system-ui;
        overflow-wrap: break-word;
        width: 925px;
        margin-left: var(--ddd-spacing-11);
        margin-top: var(--ddd-spacing-2);
      }
      .errorText {
        color: var(--ddd-theme-default-error);
        background-color: var(--ddd-theme-default-roarGolden);
      }
      .successText {
        color: var(--ddd-theme-default-opportunityGreen);
        background-color: var(--ddd-theme-default-futureLime);
      }

      .backarrow,
      .forwardarrow {
        font-family: "Press Start 2P", system-ui;
        font-size: 65px;
        color: black;
        opacity: .2;
        margin-top: var(--ddd-spacing-20);
        background-color: transparent;
        border:  transparent;
      }

      .title {
        font-size: 50px;
        animation: blinker2 1s infinite;
      }
      
      .removebtn:focus,
      .removebtn:hover,
      .savebtn:focus,
      .savebtn:hover,
      .finishbtn:focus,
      .finishbtn:hover,
      .firebtn:focus,
      .firebtn:hover {
        animation: blinker .5s linear infinite;
      }
      
      .addbtn:focus,
      .addbtn:hover {
        color: var(--ddd-theme-default-potential50);
        border-color: var(--ddd-theme-default-potential50);
      }

      @keyframes blinker {
        50% {
          opacity: 0;
        }
      }
      @keyframes blinker2 {
        0%, 50% {
          opacity: 0;
        }
        51%, 100% {
          opacity: 1;
        }
    }
    `;
  }

  //Makes it rain confetti and makes the players animate when savebtn is pressed
  makeItRain() {
    
    const error = new Audio('https://www.myinstants.com/media/sounds/error_CDOxCYm.mp3');

    //Success "screen"
    if (!this.players.includes("ENTER")) {
      this.successText = this.players + " have been added to your project!";

      //Animates characters
      this.shadowRoot.querySelectorAll("rpg-character").forEach(player => {
        player.setAttribute('walking', '');
      });

      this.shadowRoot.querySelectorAll("rpg-character").forEach(player => {
        player.setAttribute('hat', 'random');
      });

      this.errorText = "";

      const success = new Audio('https://hax.psu.edu/cdn/1.x.x/build/es6/node_modules/@lrnwebcomponents/app-hax/lib/assets/sounds/success.mp3');
      success.play();
      
      import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
        (module) => {
          setTimeout(() => {
            this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
          }, 0);
        }
      );
    } else {
      //A player was not gives a name
      error.play();
      this.errorText = "There is a player that has not been filled out!";
    }

   
  }
  
  //Adds a new player at the end of the list
  add(e) {

    this.noWalk();

    const click = new Audio('https://hax.psu.edu/cdn/1.x.x/build/es6/node_modules/@lrnwebcomponents/app-hax/lib/assets/sounds/coin.mp3');
    click.play();

    //Pushes a new item into the list and increments the number of players added
    this.players.push("ENTER");
    this.numChar++;

    //If there are already 3 added players, adding a 4th will increment starting index
    if (this.numChar > 3) {
      this.startIndex++;
    }
    this.updateArrowStyles();
    this.errorText = "";
    this.requestUpdate(); 
  }

  //Removes the player selected from the list
  remove(index) {

    this.noWalk();
    
    //Only deletes a player if there is more than 1
    if (this.numChar > 1) {
      this.players.splice(index, 1); 
      this.numChar--;

      const beep = new Audio('https://hax.psu.edu/cdn/1.x.x/build/es6/node_modules/@lrnwebcomponents/app-hax/lib/assets/sounds/click2.mp3');
      beep.play();

      //If the starting index isnt 0, deleting a player will move it down 1
      if (this.startIndex != 0) {
        this.startIndex--;
      }
      this.updateArrowStyles();
      this.errorText = "";
      this.requestUpdate(); 
    } else {
      //If you try to delete the last player
      const error = new Audio('https://www.myinstants.com/media/sounds/error_CDOxCYm.mp3');
      error.play();
      this.errorText = "Deleting the last new player? How rude.";
    }
  }

  //Saves the player's new name if there are no caps, spaces, special chars, repeat names
  //Otherwise it provides an alert message and sets the name to the default "ENTER"
  saveName(e, index) {

    this.noWalk();
    const error = new Audio('https://www.myinstants.com/media/sounds/error_CDOxCYm.mp3');

    //Gets the name from the text field
    const newName = e.target.value;

    //Because the name is automatically being updated when anything is typed, this prevents
    //the code thinking the player is already added by temporarily resetting the name
    this.players[index] = "ENTER";

    //Checks if the name chars are correct
    if (/^[a-z0-9]{1,10}$/.test(newName)) {

      //Checks if there is no name repeat
      if (!this.players.includes(newName)) {
        
        this.players[index] = newName;
        this.errorText = "";
        const beep = new Audio('https://hax.psu.edu/cdn/1.x.x/build/es6/node_modules/@lrnwebcomponents/app-hax/lib/assets/sounds/click2.mp3');
        beep.play();
        
      } else {
        //If there is a repeat name
        error.play();
        this.errorText = "Player is already added!";
        this.players[index] = "ENTER";
      }
    } else {
      //If there are uppercase letters, spaces, or special chars
      error.play();
      this.errorText = "Name can only have lowercase letters and numbers!\n No spaces either!";
      this.players[index] = "ENTER";
    }
    this.requestUpdate();
  }

  //Everytime something is typed in a text field it updates the player
  updateName(e, index) {

    this.noWalk();

    const type = new Audio('https://hax.psu.edu/cdn/1.x.x/build/es6/node_modules/@lrnwebcomponents/app-hax/lib/assets/sounds/click.mp3');
    type.play();

    //Updates the name so the player skin changes
    const newName = e.target.value;
    this.players[index] = newName;
    if (newName !== "") {
      this.requestUpdate();
    }
  }

  //Moves the list of viewable players down 1
  moveBack() {
    
    //Moves starting index down 1 to go down the list
    if (this.startIndex > 0) {
      this.startIndex--;
      const click = new Audio('https://hax.psu.edu/cdn/1.x.x/build/es6/node_modules/@lrnwebcomponents/app-hax/lib/assets/sounds/click2.mp3');
      click.play();
      this.updateArrowStyles();
      this.requestUpdate();
    } else {
      //If you can't go back
      const error = new Audio('https://www.myinstants.com/media/sounds/error_CDOxCYm.mp3');
      error.play();
    }
  }
  
  //Moves the list of viewable players up 1
  moveForward() {

    //Moves the starting index up 1 to go up the list
    if (this.startIndex < this.players.length - 4) {
      this.startIndex++;
      const click = new Audio('https://hax.psu.edu/cdn/1.x.x/build/es6/node_modules/@lrnwebcomponents/app-hax/lib/assets/sounds/click2.mp3');
      click.play();
      this.updateArrowStyles();
      this.requestUpdate();
    } else {
      //If you can't go up
      const error = new Audio('https://www.myinstants.com/media/sounds/error_CDOxCYm.mp3');
      error.play();
    }
  }

  //Removes animations if something changes (add/remove char, etc)
  noWalk() {
    this.shadowRoot.querySelectorAll("rpg-character").forEach(player => {
      player.removeAttribute('walking');
    });
    this.shadowRoot.querySelectorAll("rpg-character").forEach(player => {
      player.setAttribute('leg', "");
    });
    this.shadowRoot.querySelectorAll("rpg-character").forEach(player => {
      player.setAttribute('hat', "none");
    });
    this.successText = "";
  }

  //Sets fire to the players
  setAblaze() {
    
    //Sets the player attribute fire to true so that all current players are on fire
    if (!this.ablaze) {
      this.shadowRoot.querySelectorAll("rpg-character").forEach(player => {
        player.setAttribute('fire', '');
      });
      //Changes background to be lava
      this.ablaze = !this.ablaze;
      this.style.setProperty('--background-image-url', 
      'url("https://garden.spoonflower.com/c/4646962/p/f/m/KA0PsWp8POkicAAYEycLjIh87elCPS-9Efxw52xViSNDMH2-05QGW-Ag/8-bit%20Lava%20Block%20Design%20Two.jpg")',
      );

      const FIREINTHEHOLE = new Audio('https://www.myinstants.com/media/sounds/fire-in-the-hole-geometry-dash.mp3');
      const buzz = new Audio('https://hax.psu.edu/cdn/1.x.x/build/es6/node_modules/@lrnwebcomponents/app-hax/lib/assets/sounds/hit.mp3');
      FIREINTHEHOLE.play();
      buzz.play();
      this.fireText = "> OH GOD IT BURNS!";

    } else {
      //If players are already on fire the attribute will revert back
      this.shadowRoot.querySelectorAll("rpg-character").forEach(player => {
        player.removeAttribute('fire');
      });
      this.ablaze = !this.ablaze;
      this.style.setProperty('--background-image-url', 'url("https://static.vecteezy.com/system/resources/previews/009/877/699/non_2x/pixel-art-night-sky-background-with-clouds-and-stars-for-game-8-bit-vector.jpg")');
      const waterDrop = new Audio('https://www.myinstants.com/media/sounds/water-drop-plop.mp3');
      waterDrop.play();
      this.fireText = "> FIRE IN THE HOLE!";
    }
  }

  //Updates arrows when they are clickable
  updateArrowStyles() {

    if (this.startIndex > 0) {
      this.backArrowBool = true;
    } else {
      this.backArrowBool = false;
    }

    if (this.startIndex < this.players.length - 4) {
      this.forwardArrowBool = true;
    } else {
      this.forwardArrowBool = false;
    }

    this.requestUpdate();
  }
  
  //Ignore this it's a secret (seriously)
  secret() {
    //Don't worry about this part, it's secret
    const secretaudio = new Audio("https://www.myinstants.com/media/sounds/epic.mp3");
    secretaudio.play();
  }

  render() {

    //Only shows a max of 4 players at a time (for screen fitting purposes)
    const visPlayers = this.players.slice(this.startIndex, this.startIndex + 4);

    return html`
      <div class="project1">
        <div class="title">PRESS START</div>
        <div class="lightbg">
          <confetti-container id="confetti">
            <div class="darkbg">
              <div class="charlist">

              <!-- Back arrow that only appears if there are players with a low index that are hidden -->
                <button @click="${this.moveBack}" class="backarrow"><</button>

                <!-- Creates a map from the player list so that each player is displayed with the same design -->
                ${visPlayers.map((player, index) => html`
                  <div class="chars">
                    <div class="character-wrapper">
                      <rpg-character seed="${player}"></rpg-character>
                    </div>

                    <!-- Allows you to enter in any player's name with realtime changes to the player -->
                    <input type="text" class="nametf" .value="${player || "ENTER"}"  @input="${(e) => this.updateName(e, index + this.startIndex)}" @change="${(e) => this.saveName(e, index + this.startIndex)}">
                    
                    <div class="nameline"></div>
                    <div class="btnwrapper">

                    <!-- Save and delete button only appear on players who aren't you (first index) -->
                      ${index + this.startIndex > 0 ? html`
                        <button class="savebtn">> SAVE</button>
                        <button @click="${() => this.remove(index + this.startIndex)}" class="removebtn">> REMOVE</button>
                      ` : ''}


                    </div>
                  </div>
                `)}

                <!-- The add button to add new players -->
                <button @click="${this.add}" class="addbtn">
                  <div class="addsymbl">+</div>
                  <div class="numchar">${this.numChar} <br> Added</div>
                </button>

                <!-- Forward arrow that only appears if there are players with a high index that are hidden -->
                <button @click="${this.moveForward}" class="forwardarrow">></button>

              </div>

              <!-- Save button that runs the confetti -->
              <div class="bottombtnwrap">
                <button @click="${this.setAblaze}" class="firebtn">${this.fireText}</button>
                <button @click="${this.makeItRain}" class="finishbtn">> START JOURNEY</button>
              </div>
            </div>
          </confetti-container>
        </div>
        <div class="errorText">${this.errorText}</div>
        <div class="successText">${this.successText}</div>
      </div>

      <!-- a super secrety secret (its a secret) -->
      <button @click="${this.secret}" class="secret">?</button>
    `;
  }
  
  static get properties() {
    return {
        players: { type: Array, reflect: true },
        numChar: { type: Number, reflect: true},
        startIndex: { type: Number, reflect: true},
        walkingBool: { type: Boolean, reflect: true},
        ablaze: { type: Boolean, reflect: true},
        backArrowBool: { type: Boolean, reflect: true},
        forwardArrowBool: { type: Boolean, reflect: true},
        fireText: { type: String, reflect: true},
        successText: { type: String, reflect: true},
        errorText: { type: String, reflect: true},
        hatList: { type: Array, reflect: true}
    };
  }
}

globalThis.customElements.define(PartyUI.tag, PartyUI);
