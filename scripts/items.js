let ECHItems = {}

Hooks.once("ready",()=>{
  ECHItems[game.i18n.localize("enhancedcombathudsw5e.items.disengage.name")] = {
    "name": game.i18n.localize("enhancedcombathudsw5e.items.disengage.name"),
    "type": "feat",
    "img": "modules/enhancedcombathudsw5e/icons/journey.svg",
    "data": {
      "description": {
        "value": game.i18n.localize("enhancedcombathudsw5e.items.disengage.desc"),
        "chat": "",
        "unidentified": ""
      },
      "source": "",
      "quantity": 1,
      "weight": 0,
      "price": 0,
      "attuned": false,
      "attunement": 0,
      "equipped": false,
      "rarity": "",
      "identified": true,
      "activation": {
        "type": "action",
        "cost": 1,
        "condition": ""
      },
      "duration": {
        "value": 1,
        "units": "turn"
      },
      "target": {
        "value": null,
        "width": null,
        "units": "",
        "type": "self"
      },
      "range": {
        "value": null,
        "long": null,
        "units": ""
      },
      "consume": {
        "type": "",
        "target": "",
        "amount": null
      },
      "ability": "",
      "actionType": "util",
      "attackBonus": 0,
      "chatFlavor": "",
      "critical": null,
      "damage": {
        "parts": [],
        "versatile": ""
      },
      "formula": "",
      "save": {
        "ability": "",
        "dc": null,
        "scaling": "power"
      },
    },
    "effects": [
      {
        "_id": "8FtZnIC1vbyKZ6xF",
        "changes": [],
        "disabled": false,
        "duration": {
          "startTime": null,
          "turns": 1
        },
        "icon": "modules/enhancedcombathudsw5e/icons/journey.svg",
        "label": "Disengage",
        "origin": "Item.wyQkeuZkttllAFB1",
        "transfer": false,
        "flags": {
          "dae": {
            "stackable": "none",
            "macroRepeat": "none",
            "specialDuration": [],
            "transfer": false
          }
        },
        "tint": ""
      }
    ],
    "sort": 0,
    "flags": {
      "core": {
        "sourceId": "Item.wyQkeuZkttllAFB1"
      },
      "enhancedcombathudsw5e": {
        "set1p": false,
        "set2p": false,
        "set3p": false
      },
      "midi-qol": {
        "onUseMacroName": ""
      }
    }
  }
  ECHItems[game.i18n.localize("enhancedcombathudsw5e.items.hide.name")] = {
    "name": game.i18n.localize("enhancedcombathudsw5e.items.hide.name"),
    "type": "feat",
    "img": "modules/enhancedcombathudsw5e/icons/cloak-dagger.svg",
    "data": {
      "description": {
        "value": game.i18n.localize("enhancedcombathudsw5e.items.hide.desc"),
        "chat": "",
        "unidentified": ""
      },
      "source": "",
      "quantity": 1,
      "weight": 0,
      "price": 0,
      "attuned": false,
      "attunement": 0,
      "equipped": false,
      "rarity": "",
      "identified": true,
      "activation": {
        "type": "action",
        "cost": 1,
        "condition": ""
      },
      "duration": {
        "value": null,
        "units": ""
      },
      "target": {
        "value": null,
        "width": null,
        "units": "",
        "type": "self"
      },
      "range": {
        "value": null,
        "long": null,
        "units": ""
      },

      "consume": {
        "type": "",
        "target": "",
        "amount": null
      },
      "recharge": {
        "value": null,
        "charged": false
      },
      "ability": "",
      "actionType": "util",
      "attackBonus": 0,
      "chatFlavor": "",
      "critical": null,
      "damage": {
        "parts": [],
        "versatile": ""
      },
      "formula": "",
      "save": {
        "ability": "",
        "dc": null,
        "scaling": "power"
      },
      "consumableType": "trinket"
    },
    "effects": [
      {
        "_id": "SZkbtgGCICrpH0GJ",
        "changes": [],
        "disabled": false,
        "duration": {
          "startTime": null,
          "turns": 10
        },
        "icon": "modules/enhancedcombathudsw5e/icons/cloak-dagger.svg",
        "label": "Hide",
        "transfer": false,
        "flags": {
          "dae": {
            "stackable": "none",
            "macroRepeat": "none",
            "specialDuration": [],
            "transfer": false
          }
        },
        "tint": ""
      }
    ],
    "sort": 0,
    "flags": {
      "enhancedcombathudsw5e": {
        "set1p": false,
        "set2p": false,
        "set3p": false,
        "set1s": false,
        "set2s": false,
        "set3s": false
      },
      "midi-qol": {
        "onUseMacroName": ""
      }
    }
  }
  ECHItems[game.i18n.localize("enhancedcombathudsw5e.items.shove.name")] = {
    "name": game.i18n.localize("enhancedcombathudsw5e.items.shove.name"),
    "type": "feat",
    "img": "modules/enhancedcombathudsw5e/icons/shield-bash.svg",
    "data": {
      "description": {
        "value": game.i18n.localize("enhancedcombathudsw5e.items.shove.desc"),
        "chat": "",
        "unidentified": ""
      },
      "source": "",
      "quantity": 1,
      "weight": 0,
      "price": 0,
      "attuned": false,
      "attunement": 0,
      "equipped": false,
      "rarity": "",
      "identified": true,
      "activation": {
        "type": "action",
        "cost": 1,
        "condition": ""
      },
      "duration": {
        "value": null,
        "units": ""
      },
      "target": {
        "value": 1,
        "width": null,
        "units": "",
        "type": "creature"
      },
      "range": {
        "value": null,
        "long": null,
        "units": "touch"
      },

      "consume": {
        "type": "",
        "target": "",
        "amount": null
      },
      "ability": "",
      "actionType": "util",
      "attackBonus": 0,
      "chatFlavor": "",
      "critical": null,
      "damage": {
        "parts": [],
        "versatile": ""
      },
      "formula": "",
      "save": {
        "ability": "",
        "dc": null,
        "scaling": "power"
      },
      "consumableType": "trinket"
    },
    "effects": [],
    "sort": 0,
    "flags": {
      "enhancedcombathudsw5e": {
        "set1p": false,
        "set2p": false,
        "set3p": false
      },
      "midi-qol": {
        "onUseMacroName": ""
      }
    }
  }
  ECHItems[game.i18n.localize("enhancedcombathudsw5e.items.dash.name")] = {
    "name": game.i18n.localize("enhancedcombathudsw5e.items.dash.name"),
    "type": "feat",
    "img": "modules/enhancedcombathudsw5e/icons/walking-boot.svg",
    "data": {
      "description": {
        "value": game.i18n.localize("enhancedcombathudsw5e.items.dash.desc"),
        "chat": "",
        "unidentified": ""
      },
      "source": "",
      "quantity": 1,
      "weight": 0,
      "price": 0,
      "attuned": false,
      "attunement": 0,
      "equipped": false,
      "rarity": "",
      "identified": true,
      "activation": {
        "type": "action",
        "cost": 1,
        "condition": ""
      },
      "duration": {
        "value": null,
        "units": ""
      },
      "target": {
        "value": null,
        "width": null,
        "units": "",
        "type": "self"
      },
      "range": {
        "value": null,
        "long": null,
        "units": ""
      },

      "consume": {
        "type": "",
        "target": "",
        "amount": null
      },
      "ability": "",
      "actionType": "util",
      "attackBonus": 0,
      "chatFlavor": "",
      "critical": null,
      "damage": {
        "parts": [],
        "versatile": ""
      },
      "formula": "",
      "save": {
        "ability": "",
        "dc": null,
        "scaling": "power"
      },
      "consumableType": "trinket"
    },
    "effects": [
      {
        "_id": "PPMPZY1t3AUB7UGA",
        "changes": [],
        "disabled": false,
        "duration": {
          "startTime": null,
          "rounds": 1
        },
        "icon": "modules/enhancedcombathudsw5e/icons/walking-boot.svg",
        "label": "Dash",
        "transfer": false,
        "flags": {
          "dae": {
            "stackable": "none",
            "macroRepeat": "none",
            "specialDuration": [],
            "transfer": false
          }
        },
        "tint": ""
      }
    ],
    "sort": 0,
    "flags": {
      "enhancedcombathudsw5e": {
        "set1p": false,
        "set2p": false,
        "set3p": false
      },
      "midi-qol": {
        "onUseMacroName": ""
      }
    }
  }
  ECHItems[game.i18n.localize("enhancedcombathudsw5e.items.dodge.name")] = {
    "name": game.i18n.localize("enhancedcombathudsw5e.items.dodge.name"),
    "type": "feat",
    "img": "modules/enhancedcombathudsw5e/icons/armor-upgrade.svg",
    "data": {
      "description": {
        "value": game.i18n.localize("enhancedcombathudsw5e.items.dodge.desc"),
        "chat": "",
        "unidentified": ""
      },
      "source": "",
      "quantity": 1,
      "weight": 0,
      "price": 0,
      "attuned": false,
      "attunement": 0,
      "equipped": false,
      "rarity": "",
      "identified": true,
      "activation": {
        "type": "action",
        "cost": 1,
        "condition": ""
      },
      "duration": {
        "value": 1,
        "units": "round"
      },
      "target": {
        "value": null,
        "width": null,
        "units": "",
        "type": "self"
      },
      "range": {
        "value": null,
        "long": null,
        "units": ""
      },

      "consume": {
        "type": "",
        "target": "",
        "amount": null
      },
      "ability": "",
      "actionType": "util",
      "attackBonus": 0,
      "chatFlavor": "",
      "critical": null,
      "damage": {
        "parts": [],
        "versatile": ""
      },
      "formula": "",
      "save": {
        "ability": "",
        "dc": null,
        "scaling": "power"
      },
      "consumableType": "trinket"
    },
    "effects": [
      {
        "_id": "2xH2YQ6pm430O0Aq",
        "changes": [],
        "disabled": false,
        "duration": {
          "startTime": null,
          "turns": 1
        },
        "icon": "modules/enhancedcombathudsw5e/icons/armor-upgrade.svg",
        "label": "Dodge",
        "origin": "Item.pakEYcgLYxtKGv7J",
        "transfer": false,
        "flags": {
          "dae": {
            "stackable": "none",
            "macroRepeat": "none",
            "specialDuration": [],
            "transfer": false
          }
        },
        "tint": ""
      }
    ],
    "sort": 0,
    "flags": {
      "enhancedcombathudsw5e": {
        "set1p": false,
        "set2p": false,
        "set3p": false
      },
      "midi-qol": {
        "onUseMacroName": ""
      }
    }
  }
  ECHItems[game.i18n.localize("enhancedcombathudsw5e.items.ready.name")] = {
    "name": game.i18n.localize("enhancedcombathudsw5e.items.ready.name"),
    "type": "feat",
    "img": "modules/enhancedcombathudsw5e/icons/clockwork.svg",
    "data": {
      "description": {
        "value": game.i18n.localize("enhancedcombathudsw5e.items.ready.desc"),
        "chat": "",
        "unidentified": ""
      },
      "source": "",
      "quantity": 1,
      "weight": 0,
      "price": 0,
      "attuned": false,
      "attunement": 0,
      "equipped": false,
      "rarity": "",
      "identified": true,
      "activation": {
        "type": "action",
        "cost": 1,
        "condition": ""
      },
      "duration": {
        "value": null,
        "units": ""
      },
      "target": {
        "value": null,
        "width": null,
        "units": "",
        "type": ""
      },
      "range": {
        "value": null,
        "long": null,
        "units": ""
      },

      "consume": {
        "type": "",
        "target": "",
        "amount": null
      },
      "ability": "",
      "actionType": "util",
      "attackBonus": 0,
      "chatFlavor": "",
      "critical": null,
      "damage": {
        "parts": [],
        "versatile": ""
      },
      "formula": "",
      "save": {
        "ability": "",
        "dc": null,
        "scaling": "power"
      },
      "consumableType": "trinket"
    },
    "effects": [
      {
        "_id": "BevDb0J80M9BdoEl",
        "changes": [],
        "disabled": false,
        "duration": {
          "startTime": null,
          "turns": 1
        },
        "icon": "modules/enhancedcombathudsw5e/icons/clockwork.svg",
        "label": "Ready",
        "transfer": false,
        "flags": {
          "dae": {
            "stackable": "none",
            "macroRepeat": "none",
            "specialDuration": [],
            "transfer": false
          }
        },
        "tint": ""
      }
    ],
    "sort": 0,
    "flags": {
      "enhancedcombathudsw5e": {
        "set1p": false,
        "set2p": false,
        "set3p": false
      },
      "midi-qol": {
        "onUseMacroName": ""
      }
    }
  }
})