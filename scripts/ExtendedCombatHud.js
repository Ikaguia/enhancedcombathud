class CombatHud {
  constructor(token) {
    this.token = token;
    this.actor = token.actor;
    this.settings = {
      fadeOutInactive: game.settings.get("enhancedcombathudsw5e", "fadeOutInactive"),
      powerMode: game.settings.get("enhancedcombathudsw5e", "preparedPowers"),
      playerDetailsBottom: game.settings.get("enhancedcombathudsw5e", "playerDetailsBottom"),
      localize: {
        mainactions: game.i18n.localize(
          "enhancedcombathudsw5e.hud.mainactions.name"
        ),
        castpower: game.i18n.localize("enhancedcombathudsw5e.hud.castpower.name"),
        usefeat: game.i18n.localize("enhancedcombathudsw5e.hud.usefeat.name"),
        useitem: game.i18n.localize("enhancedcombathudsw5e.hud.useitem.name"),
        bonusaction: game.i18n.localize(
          "enhancedcombathudsw5e.hud.bonusaction.name"
        ),
        reaction: game.i18n.localize("enhancedcombathudsw5e.hud.reaction.name"),
        specialaction: game.i18n.localize(
          "enhancedcombathudsw5e.hud.specialaction.name"
        ),
        pass: game.i18n.localize("enhancedcombathudsw5e.hud.pass.name"),
        endturn: game.i18n.localize("enhancedcombathudsw5e.hud.endturn.name"),
        hp: game.i18n.localize("enhancedcombathudsw5e.hud.hp.name"),
        ac: game.i18n.localize("enhancedcombathudsw5e.hud.ac.name"),
        of: game.i18n.localize("enhancedcombathudsw5e.hud.of.name"),
        inv: game.i18n.localize("enhancedcombathudsw5e.hud.inventory.name"),
        saves: game.i18n.localize("enhancedcombathudsw5e.hud.saves.name"),
        skills: game.i18n.localize("enhancedcombathudsw5e.hud.skills.name"),
        tools: game.i18n.localize("enhancedcombathudsw5e.hud.tools.name"),
        powers: {
          0: game.sw5e.config.powerLevels["0"],
          pact: game.sw5e.config.powerPreparationModes.pact,
          will: game.sw5e.config.powerPreparationModes.atwill,
          innate: game.i18n.localize("enhancedcombathudsw5e.hud.powers.innate"),
          1: game.sw5e.config.powerLevels["1"],
          2: game.sw5e.config.powerLevels["2"],
          3: game.sw5e.config.powerLevels["3"],
          4: game.sw5e.config.powerLevels["4"],
          5: game.sw5e.config.powerLevels["5"],
          6: game.sw5e.config.powerLevels["6"],
          7: game.sw5e.config.powerLevels["7"],
          8: game.sw5e.config.powerLevels["8"],
          9: game.sw5e.config.powerLevels["9"],
        },
      },
    };
    this.actions = {
      attack: this.getItems({
        actionType: ["action"],
        itemType: ["weapon"],
        equipped: true,
      }),
      powers: this.getItems({
        actionType: ["action"],
        itemType: ["power"],
        prepared: true,
      }),
      special: this.getItems({ actionType: ["action"], itemType: ["feat"] }),
      consumables: this.getItems({
        actionType: ["action"],
        itemType: ["consumable"],
      }),
    };
    this.bonus = {
      attack: this.getItems({
        actionType: ["bonus"],
        itemType: ["weapon"],
        equipped: true,
      }),
      powers: this.getItems({
        actionType: ["bonus"],
        itemType: ["power"],
        prepared: true,
      }),
      special: this.getItems({ actionType: ["bonus"], itemType: ["feat"] }),
      consumables: this.getItems({
        actionType: ["bonus"],
        itemType: ["consumable"],
      }),
    };
    this.reactions = {
      attack: this.getItems({
        actionType: ["reaction"],
        itemType: ["weapon"],
        equipped: true,
      }),
      powers: this.getItems({
        actionType: ["reaction"],
        itemType: ["power"],
        prepared: true,
      }),
      special: this.getItems({
        actionType: ["reaction"],
        itemType: ["feat"],
      }),
      consumables: this.getItems({
        actionType: ["reaction"],
        itemType: ["consumable"],
      }),
    };
    this.free = {
      special: this.getItems({ actionType: ["special"], itemType: ["feat"] }),
    };
    this.other = {
      portrait: this.actor.data.img,
      name: this.actor.data.name,
      maxHp: this.actor.data.data.attributes.hp.max,
      currHp: this.actor.data.data.attributes.hp.value,
      movement: {
        max: Math.round(
          this.actor.data.data.attributes.movement.walk /
            canvas.dimensions.distance
        ),
        current: 0,
        moved: 0,
      },
      ac: this.actor.data.data.attributes.ac.value,
      classes: this.getClassesAsString(),
      specialItemsNames: {
        disengage: game.i18n.localize("enhancedcombathudsw5e.items.disengage.name"),
        hide: game.i18n.localize("enhancedcombathudsw5e.items.hide.name"),
        shove: game.i18n.localize("enhancedcombathudsw5e.items.shove.name"),
        dash: game.i18n.localize("enhancedcombathudsw5e.items.dash.name"),
        dodge: game.i18n.localize("enhancedcombathudsw5e.items.dodge.name"),
        ready: game.i18n.localize("enhancedcombathudsw5e.items.ready.name"),
      },
    };
    this.resources = {
      action: true,
      bonus: true,
      other: true,
    };
    this.resources = {
      action: true,
      bonus: true,
      reaction: true,
    };
    this.skills = this.actor.data.data.skills;
    this.saves = this.actor.data.data.abilities;
    this.tools = this.actor.data.items
      .filter((i) => i.data.type == "tool")
      .map((item, index) => {
        let toolAbility =
          typeof item.data.data.ability == "string"
            ? item.data.data.ability
            : item.data.data.ability[0] || "str";
        let abilityModifiers = this.actor.data.data.abilities[toolAbility];
        let toolProficiency = Math.ceil(
          item.data.data.proficient * this.actor.data.data.prof
        );

        return {
          ability: toolAbility,
          bonus: 0,
          label: item.data.name,
          mod: abilityModifiers.mod,
          passive: 8 + toolProficiency + abilityModifiers.mod,
          prof: toolProficiency,
          total: toolProficiency + abilityModifiers.mod,
          type: "Number",
          proficient: item.data.data.proficient,
        };
      });

    // Localize skills
    Object.keys(game.sw5e.config.skills).forEach((skill) => {
      this.skills[skill].label = game.sw5e.config.skills[skill];
      this.skills[skill].proficient = this.skills[skill].value;
      this.skills[skill].tooltip = game.i18n.localize(
        `enhancedcombathudsw5e.skills.${skill}.tooltip`
      );
    });

    //
    Object.keys(game.sw5e.config.abilities).forEach((ability) => {
      this.saves[ability].label = game.sw5e.config.abilities[ability];
      this.saves[ability].total = this.saves[ability].save;
      this.saves[ability].tooltip = game.i18n.localize(
        `enhancedcombathudsw5e.abilities.${ability}.tooltip`
      );
    });

    console.log(this);
  }
  getClassesAsString() {
    try {
      let classes = this.actor.data.data.classes;
      if (!classes) return "";
      if (Object.keys(classes).length === 0)
        return this.actor.labels.creatureType;
      let string = "";
      for (let [key, value] of Object.entries(classes)) {
        string += "lvl " + value.levels + " ";
        string += key[0].toUpperCase() + key.substring(1);
        string += value.archetype
          ? " (" +
            value.archetype[0].toUpperCase() +
            value.archetype.substring(1) +
            ") "
          : "";
      }
      return string;
    } catch {
      return "";
    }
  }
  getItems(filters) {
    const actionType = filters.actionType;
    const itemType = filters.itemType;
    const equipped = filters.equipped;
    const prepared = filters.prepared;

    let items = this.actor.data.items;

    let filteredItems = items.filter((i) => {
      let itemData = i.data;
      if (equipped === true && !itemData.data.equipped) return false;
      if (
        this.settings.powerMode &&
        prepared === true &&
        itemData.data.preparation?.prepared === false &&
        itemData.data.preparation?.mode == "prepared"
      )
        return false;
      if (
        actionType &&
        actionType.includes(itemData.data.activation?.type) &&
        itemType &&
        itemType.includes(itemData.type)
      )
        return true;
      return false;
    });
    let powers = {};
    powers[this.settings.localize.powers["0"]] = [];
    powers[this.settings.localize.powers["innate"]] = [];
    powers[this.settings.localize.powers["will"]] = [];
    powers[this.settings.localize.powers["pact"]] = [];
    powers[this.settings.localize.powers["1"]] = [];
    powers[this.settings.localize.powers["2"]] = [];
    powers[this.settings.localize.powers["3"]] = [];
    powers[this.settings.localize.powers["4"]] = [];
    powers[this.settings.localize.powers["5"]] = [];
    powers[this.settings.localize.powers["6"]] = [];
    powers[this.settings.localize.powers["7"]] = [];
    powers[this.settings.localize.powers["8"]] = [];
    powers[this.settings.localize.powers["9"]] = [];
    if (prepared) {
      for (let item of filteredItems) {
        let key = item.labels.level;
        switch (item.data.data.preparation.mode) {
          case "innate":
            key = this.settings.localize.powers["innate"];
            break;

          case "atwill":
            key = this.settings.localize.powers["will"];
            break;

          case "pact":
            key = this.settings.localize.powers["pact"];
            break;
        }
        powers[key].push(item);
      }

      for (let powerLevel of Object.keys(powers)) {
        if (powers[powerLevel].length == 0) {
          delete powers[powerLevel];
        }
      }
    }

    if (filters.prepared === true) {
      return powers;
    } else {
      return filteredItems;
    }
  }
  findItemByName(itemName) {
    let items = this.actor.data.items;
    let item = items.find((i) => i.data.name == itemName);
    return item;
  }
  get sets() {
    let items = this.actor.data.items;
    let sets;
    sets = {
      set1: {
        primary: null,
        secondary: null,
      },
      set2: {
        primary: null,
        secondary: null,
      },
      set3: {
        primary: null,
        secondary: null,
      },
    };
    if (this.actor.type == "npc") {
      sets = {
        set1: {
          primary: this.actions.attack[0],
          secondary: this.bonus.attack[0],
        },
        set2: {
          primary: this.actions.attack[1],
          secondary: this.bonus.attack[1],
        },
        set3: {
          primary: this.actions.attack[2],
          secondary: this.bonus.attack[2],
        },
      };
    }
    for (let item of items) {
      if (item.data.flags.enhancedcombathudsw5e?.set1p) sets.set1.primary = item;
      if (item.data.flags.enhancedcombathudsw5e?.set2p) sets.set2.primary = item;
      if (item.data.flags.enhancedcombathudsw5e?.set3p) sets.set3.primary = item;
      if (item.data.flags.enhancedcombathudsw5e?.set1s) sets.set1.secondary = item;
      if (item.data.flags.enhancedcombathudsw5e?.set2s) sets.set2.secondary = item;
      if (item.data.flags.enhancedcombathudsw5e?.set3s) sets.set3.secondary = item;
    }

    sets.active = this.actor.data.flags.enhancedcombathudsw5e?.activeSet
      ? sets[`${this.actor.data.flags.enhancedcombathudsw5e?.activeSet}`]
      : sets.set1;

    return sets;
  }
  _render() {
    canvas.hud.enhancedcombathudsw5e.bind(this.token);
  }
  async switchSets(active) {
    if(this.sets.set1.primary?.data.data.equipped) await this.sets.set1.primary?.update({ "data.equipped": false });
    if(this.sets.set1.secondary?.data.data.equipped) await this.sets.set1.secondary?.update({ "data.equipped": false });
    if(this.sets.set2.primary?.data.data.equipped) await this.sets.set2.primary?.update({ "data.equipped": false });
    if(this.sets.set2.secondary?.data.data.equipped) await this.sets.set2.secondary?.update({ "data.equipped": false });
    if(this.sets.set3.primary?.data.data.equipped) await this.sets.set3.primary?.update({ "data.equipped": false });
    if(this.sets.set3.secondary?.data.data.equipped) await this.sets.set3.secondary?.update({ "data.equipped": false });
    //this.sets.active = this.sets[active];
    await this.actor.setFlag("enhancedcombathudsw5e", "activeSet", active);
    if(!this.sets.active.primary?.data.data.equipped) await this.sets.active.primary?.update({ "data.equipped": true });
    if(!this.sets.active.secondary?.data.data.equipped) await this.sets.active.secondary?.update({ "data.equipped": true });
  }
  set hasAction(value) {
    $(canvas.hud.enhancedcombathudsw5e.element)
      .find('.actions-container.has-actions[data-actionbartype="actions"]')
      .toggleClass("actions-used", !value);
  }
  set hasReaction(value) {
    $(canvas.hud.enhancedcombathudsw5e.element)
      .find('.actions-container.has-actions[data-actionbartype="reactions"]')
      .toggleClass("actions-used", !value);
  }
  set hasBonus(value) {
    $(canvas.hud.enhancedcombathudsw5e.element)
      .find('.actions-container.has-actions[data-actionbartype="bonus"]')
      .toggleClass("actions-used", !value);
  }
  get powerSlots() {
    return this.actor.data.data.powers;
  }
  get movementColor() {}
}

class CombatHudCanvasElement extends BasePlaceableHUD {
  static get defaultOptions() {
    const options = super.defaultOptions;
    options.template =
      "modules/enhancedcombathudsw5e/templates/extendedCombatHud.html";
    options.id = "enhancedcombathudsw5e";
    options.dragDrop = [{ dragSelector: null, dropSelector: null }];
    return options;
  }

  _canDragDrop(selector) {
    return true;
  }

  getData() {
    const data = super.getData();
    data.hudData = new CombatHud(this.object);
    this.hudData = data.hudData;
    if (data.hudData.actor.data.data.attributes.force.level && data.hudData.actor.data.data.attributes.force.level >= data.hudData.actor.data.data.attributes.tech.level) {
      this.hudData.actor.data.data.attributes.powerdc = this.hudData.actor.data.data.attributes.powerForceUniversalDC;
    }
    else if (data.hudData.actor.data.data.attributes.tech.level) {
      this.hudData.actor.data.data.attributes.powerdc = this.hudData.actor.data.data.attributes.powerTechDC;
    }
    this.roller = new ECHDiceRoller(this.hudData.actor);
    return data;
  }

  close() {
    super.close();
    this.toggleMacroPlayers(true);
  }

  activateListeners(html) {
    super.activateListeners(html);
  }

  async _onDrop(event) {
    event.preventDefault();
    let set = event.target?.dataset?.set;
    let data;
    try {
      data = JSON.parse(event.dataTransfer.getData("text/plain"));
    } catch (err) {
      //return false;
    }
    if (set) {
      await this.dragDropSet(set, data.data._id, event.target);
      this.initSets();
    } else {
      this.dragDropSetRemove(event.dataTransfer.getData("text"));
    }
  }

  setPosition() {
    if (!this.object) return;
    this.rigHtml();
    const position = {
      "z-index": 100,
      left: game.settings.get("enhancedcombathudsw5e", "leftPos") + "px",
      bottom: game.settings.get("enhancedcombathudsw5e", "botPos") + "px",
    };
    this.element.css(position);
    this.toggleMacroPlayers(false);
  }

  rigHtml() {
    this.clearEmpty();
    this.setColorSettings();
    this.updatePass();
    this.updateMovement();
    this.rigButtons();
    this.rigSkills();
    this.rigAccordion();
    this.initSets();
    this.rigAutoScale();
  }
  setColorSettings() {
    Object.flatten = function (data) {
      var result = {};
      function recurse(cur, prop) {
        if (Object(cur) !== cur) {
          result[prop] = cur;
        } else if (Array.isArray(cur)) {
          for (var i = 0, l = cur.length; i < l; i++)
            recurse(cur[i], prop + "[" + i + "]");
          if (l == 0) result[prop] = [];
        } else {
          var isEmpty = true;
          for (var p in cur) {
            isEmpty = false;
            recurse(cur[p], prop ? prop + "." + p : p);
          }
          if (isEmpty && prop) result[prop] = {};
        }
      }
      recurse(data, "");
      return result;
    };
    function setThemeColors(colors) {
      Object.entries(Object.flatten(colors)).forEach(([key, value]) => {
        document.documentElement.style.setProperty(
          `--ech-${key.replace(/\./g, "-")}`,
          value
        );
      });
    }

    let theme = game.settings.get("enhancedcombathudsw5e", "echThemeData");

    if (theme.theme == "custom") {
      setThemeColors(theme.colors);
    } else {
      fetch(`./modules/enhancedcombathudsw5e/scripts/themes/${theme.theme}.json`)
        .then((response) => response.json())
        .then((colors) => {
          setThemeColors(colors);
        });
    }
  }

  rigAutoScale() {
    let echHUDWidth = $(".extended-combat-hud").outerWidth();
    let windowWidth = $(window).width() - 340;
    let scale = game.settings.get("enhancedcombathudsw5e", "noAutoscale")
      ? game.settings.get("enhancedcombathudsw5e", "scale")
      : (1 / (echHUDWidth / windowWidth)) *
        game.settings.get("enhancedcombathudsw5e", "scale");

    $(".extended-combat-hud").css({
      transform: `scale(${scale > 1 ? 1 : scale})`,
    });
  }

  rigButtons() {
    let _this = this;
    this.element.unbind("click");
    this.element.unbind("mouseenter");
    this.element.on("click", '[data-type="trigger"]', async (event) => {
      let itemName = $(event.currentTarget).data("itemname");
      let actionDataSet = event.currentTarget.dataset.atype;
      let specialItem;
      if (!_this.hudData.findItemByName(itemName))
        specialItem = this.getSpecialItem(itemName);
      let confimed = specialItem
        ? await specialItem.roll()
        : await this.roller.rollItem(itemName);
      let item = specialItem || _this.hudData.findItemByName(itemName);
      if (confimed && game.combat?.started) {
        if (actionDataSet) {
          this.updateActionEconomy(actionDataSet);
        } else {
          this.updateActionEconomy(
            item.data?.data?.activation?.type ?? item.data.activation.type
          );
        }
      }

      if (!item) {
        $(event.currentTarget).remove();
      } else {
        let uses = item.data.data.quantity || item.data.data.uses.value;
        let isAmmo = item.data.data.consume?.type == "ammo";
        let ammoItem = isAmmo
          ? this.hudData.actor.items.find(
              (i) => i.id == item.data.data.consume?.target
            )
          : null;
        let ammoCount = confimed
          ? ammoItem?.data?.data?.quantity - item.data.data.consume?.amount
          : ammoItem?.data?.data?.quantity;
        event.currentTarget.dataset.itemCount = isAmmo ? ammoCount : uses;
      }
      this.updatePowerSlots();
    });
    this.element.on("mouseenter", '[data-type="trigger"]', (event) => {
      let $element = $(event.currentTarget);
      let itemName = $(event.currentTarget).data("itemname");

      const offset = $element.offset();
      offset.left += $element[0].getBoundingClientRect().width / 2;

      $(".ech-tooltip").remove();

      setTimeout(() => {
        this.drawTooltip(itemName, offset);
      }, 100);
    });
    this.element.on("mouseleave", '[data-type="trigger"]', (event) => {
      // Allow User to hover over Tooltip
      setTimeout(() => {
        $(".ech-tooltip:not(.is-hover)").remove();
      }, 100);
    });
    this.element.on(
      "mouseenter",
      ".ability-menu .ability:not(.ability-title)",
      (event) => {
        let $element = $(event.currentTarget);
        let whatToRoll = $(event.currentTarget).data("roll");
        let type = "";
        if ($element.hasClass("is-save")) type = "save";
        if ($element.hasClass("is-skill")) type = "skill";
        if ($element.hasClass("is-tool")) type = "tool";

        const offset = $element.offset();
        offset.left += $element[0].getBoundingClientRect().width + 10;

        $(".ech-tooltip").remove();

        setTimeout(() => {
          this.drawTooltip(whatToRoll, offset, type);
        }, 100);
      }
    );
    this.element.on("mouseleave", ".ability", (event) => {
      // Allow User to hover over Tooltip
      setTimeout(() => {
        $(".ech-tooltip:not(.is-hover)").remove();
      }, 100);
    });

    $("body").on("mouseenter", ".ech-tooltip", (event) => {
      $(event.currentTarget).addClass("is-hover");
    });
    $("body").on("mouseleave", ".ech-tooltip.is-hover", (event) => {
      $(event.currentTarget).remove();
    });
    this.element.on("click", '[data-pass="true"]', async (event) => {
      if (game.combat?.current?.tokenId == this.hudData.token.id)
        game.combat?.nextTurn();
    });
    this.element.on("click", '[data-type="menu"]', (event) => {
      let category = event.currentTarget.dataset.menu;
      let actionType = event.currentTarget.dataset.actiontype;
      let isActive = $(event.currentTarget).hasClass("active");
      // data-containeractiontype="actions"
      //data-actiontype="bonus"
      // Hide Open Menus
      $(_this.element).find(`div[data-iscontainer="true"]`).removeClass("show");
      // Remove Active State from Menu Toggle
      $(_this.element).find('div[data-type="menu"]').removeClass("active");
      // Add Active State to Clicked Menu
      $(event.currentTarget).toggleClass("active", !isActive);
      // Show Active Menu
      $(_this.element)
        .find(
          `div[class="features-container ${category}"][data-containeractiontype="${actionType}"]`
        )
        .toggleClass(
          "show",
          $(event.currentTarget).hasClass("active") && !isActive
        );
    });
    this.element.on("click", '[data-type="switchWeapons"]', async (event) => {
      let $element = $(event.currentTarget);
      if (!$element.hasClass("active")) {
        $(this.element)
          .find('[data-type="switchWeapons"].active')
          .removeClass("active");
        $element.addClass("active");
        this.switchSets($element[0].dataset.value);
      }
    });
    this.element.on("dragstart", ".set", async (event) => {
      event.originalEvent.dataTransfer.setData(
        "text",
        event.currentTarget.dataset.set
      );
      $(".extended-combat-hud").addClass("ech-remove-set");
    });
    this.element.on("dragend", ".set", async (event) => {
      event.originalEvent.dataTransfer.setData(
        "text",
        event.currentTarget.dataset.set
      );
      $(".extended-combat-hud").removeClass("ech-remove-set");
    });
  }

  rigSkills() {
    $(this.element).on(
      "change",
      ".ability-menu .ability  .ability-code select",
      (event) => {
        let $element = $(event.currentTarget);
        let abilityScore = $element.val();
        let $ability = $element.closest(".ability");
        let whatToRoll = $element.closest(".ability").data("roll");
        let data = null;

        // Update Ability
        $element.closest(".ability").data("modifier", abilityScore);

        if ($ability.hasClass("is-save")) {
          data = this.hudData.saves[whatToRoll];
        } else if ($ability.hasClass("is-skill")) {
          data = this.hudData.skills[whatToRoll];
        } else if ($ability.hasClass("is-tool")) {
          data = this.hudData.tools.filter(
            (tool) => tool.label == whatToRoll
          )[0];
        } else {
          return false;
        }

        let newTotal = data.prof + this.hudData.saves[abilityScore].mod;
        $element
          .closest(".ability")
          .find(".ability-modifier")
          .html(newTotal > 0 ? `+${newTotal}` : newTotal);
      }
    );
    $(this.element).on("click", "li.is-save > div > span", (event) => {
      let $element = $(event.currentTarget);
      let $ability = $element.closest(".ability");
      let whatToRoll = $ability.data("roll");

      if ($element.data("type") == "save") {
        this.roller.rollSave(whatToRoll, event);
      } else if ($element.data("type") == "check") {
        this.roller.rollCheck(whatToRoll, event);
      }
    });

    $(this.element).on("click", "li .ability-name", (event) => {
      let whatToRoll = $(event.currentTarget).closest(".ability").data("roll");
      let abilityScoreToUse = $(event.currentTarget)
        .closest(".ability")
        .data("modifier");
      let $ability = $(event.currentTarget).closest(".ability");

      if ($ability.hasClass("is-save")) {
        this.roller.rollSave(whatToRoll, event);
      } else if ($ability.hasClass("is-skill")) {
        this.roller.rollSkill(whatToRoll, abilityScoreToUse, event);
      } else if ($ability.hasClass("is-tool")) {
        let tool = this.hudData.tools.filter(
          (tool) => tool.label == whatToRoll
        )[0];
        this.roller.rollTool(tool.label, abilityScoreToUse, event);
      } else {
        return false;
      }

      //this.roller.rollSkill(skill, abil);
    });
  }

  rigAccordion() {
    this.element.find(".features-container").each((index, featureContainer) => {
      // 375 = Portrait | 320 = Sidebar
      let powerHudWidth = 375 + 320;
      $(featureContainer)
        .find(".features-accordion")
        .each((index, element) => {
          let $element = $(element);
          let numberOfFeatures = $element.find(".feature-element").length;

          powerHudWidth +=
            numberOfFeatures > 3 ? 450 + 53 : numberOfFeatures * 150 + 53;

          $element.css({
            width: `${
              numberOfFeatures > 3 ? 450 + 53 : numberOfFeatures * 150 + 53
            }px`,
          });
          $element.find(".features-accordion-content").css({
            "min-width": `${
              numberOfFeatures > 3 ? 450 : numberOfFeatures * 150
            }px`,
          });
        });

      // If container is smaller than window size, then open containers.
      $(featureContainer)
        .find(".features-accordion")
        .toggleClass("show", powerHudWidth < $(window).width());
    });

    // If container is larger than window, allow accordion usage
    //if (powerHudWidth > $(window).width()) {
    this.element.on("click", ".feature-accordion-title", (event) => {
      let $element = $(event.currentTarget);
      let $accordion = $element.closest(".features-accordion");
      let $container = $element.closest(".features-container");

      if ($container.width() + 503 > $(window).width()) {
        $container.find(".features-accordion").removeClass("show");
      }

      $accordion.toggleClass("show");
    });
    //}
  }

  clearEmpty() {
    let menuButtons = $(this.element).find('[data-type="menu"]');
    for (let button of menuButtons) {
      let category = button.dataset.actiontype;
      let itemType = button.dataset.itemtype;
      let objectToCheck = this.hudData[category][itemType];
      if (
        objectToCheck == [] ||
        objectToCheck == {} ||
        !objectToCheck ||
        objectToCheck.length == 0 ||
        Object.keys(objectToCheck).length === 0
      ) {
        $(button).remove();
      }
    }
    let categroyContainers = $(this.element).find("[data-actionbartype]");
    for (let container of categroyContainers) {
      let actiontype = container.dataset.actionbartype;
      if (actiontype == "actions") continue;
      let remove = true;
      if (actiontype == "bonus" && this.hudData.sets.active.secondary)
        remove = false;
      if (actiontype == "reactions" && this.hudData.sets.active.primary)
        remove = false;

      for (let [key, value] of Object.entries(this.hudData[actiontype])) {
        if (
          !(
            value == [] ||
            value == {} ||
            !value ||
            value.length == 0 ||
            Object.keys(value).length === 0
          )
        ) {
          remove = false;
        }
      }
      if (remove) $(container).hide();
      else $(container).show();
    }
  }

  async switchSets(set) {
    await this.hudData.switchSets(set);
    let primary = $(this.element).find('div[data-set="setp"]');
    let secondary = $(this.element).find('div[data-set="sets"]');
    this.updateSetElement(primary, this.hudData.sets.active.primary);
    this.updateSetElement(secondary, this.hudData.sets.active.secondary);
    this.clearEmpty();
  }
  updateSetElement(element, item) {
    if (!item) {
      element.css({ display: "none" });
      return;
    }
    let isAmmo = item.data.data.consume?.type == "ammo";
    let ammoItem = isAmmo
      ? this.hudData.actor.items.find(
          (i) => i.id == item.data.data.consume?.target
        )
      : null;
    element.toggleClass("has-count", isAmmo);
    if (element[0])
      element[0].dataset.itemCount = ammoItem?.data?.data?.quantity;
    if (element[1])
      element[1].dataset.itemCount = ammoItem?.data?.data?.quantity;
    element
      .data("itemname", item.name)
      .prop("data-itemname", item.name)
      .css({ "background-image": `url(${item.data.img})`, display: "flex" })
      .find(".action-element-title")
      .text(item.name);
  }
  initSets() {
    let set =
      this.hudData.actor.data.flags.enhancedcombathudsw5e?.activeSet || "set1";
    this.switchSets(set);
    $(this.element)
      .find('div[data-type="switchWeapons"]')
      .removeClass("active");
    $(this.element).find(`div[data-value="${set}"]`).addClass("active");
  }

  resetActionsUses() {
    this.hudData.hasAction = true;
    this.hudData.hasBonus = true;
    this.hudData.hasReaction = true;
  }

  newRound() {
    this.resetActionsUses();
    this.hudData.other.movement.current = this.hudData.other.movement.max;
    this.hudData.other.movement.moved = 0;
    this.updateMovement(0, true);
  }

  updateActionEconomy(actionType) {
    switch (actionType) {
      case "action":
        this.hudData.hasAction = false;
        break;
      case "bonus":
        this.hudData.hasBonus = false;
        break;
      case "reaction":
        this.hudData.hasReaction = false;
        break;
    }
  }

  updateMovement(bars = 0, reset = false) {
    bars = game.combat?.started && !reset ? bars : 0;
    let movementColor;
    switch (bars) {
      case 0:
        movementColor = "base-movement";
        break;
      case 1:
        movementColor = "dash-movement";
        break;
      case 2:
        movementColor = "danger-movement";
        break;
    }
    let disabledBars =
      game.combat?.started && !reset ? this.hudData.other.movement.current : 0;
    let barsNumber =
      game.combat?.started && !reset
        ? this.hudData.other.movement.max - disabledBars
        : this.hudData.other.movement.max;
    let $element = $(this.element).find(".movement-spaces");
    let newHtml = "";
    for (let i = 0; i < barsNumber; i++) {
      newHtml += `<div class="movement-space  ${movementColor}"></div>`;
    }
    for (let i = 0; i < disabledBars; i++) {
      newHtml += `<div class="movement-space"></div>`;
    }
    $(this.element).find(".movement-current").text(barsNumber);
    $(this.element)
      .find(".movement-max")
      .text((bars + 1) * this.hudData.other.movement.max);
    $element.html(newHtml);
  }

  updatePortrait(hp, maxhp, ac) {
    let hpelel = $(this.element).find("span[data-hp-value]");
    let maxhpel = $(this.element).find("span[data-hp-max]");
    let acelel = $(this.element).find("span[data-ac-value]");
    hpelel[0].dataset.hpValue = hp;
    maxhpel[0].dataset.hpMax = maxhp;
    acelel[0].dataset.acValue = ac;
  }

  getSpecialItem(itemName) {
    if (!ECHItems[itemName]) return false;
    return new CONFIG.Item.documentClass(ECHItems[itemName], {
      parent: this.hudData.actor,
    });
  }

  updatePass() {
    let element = $(this.element).find("div[data-passcont]");
    if (this.hudData?.token?.id == game.combat?.current?.tokenId) {
      element.css({ display: "flex" });
    } else {
      element.css({ display: "none" });
    }
  }

  toggleMacroPlayers(togg) {
    $("#players").css("display", togg ? "block" : "none");
    $("#hotbar").css("display", togg ? "flex" : "none");
  }

  static generatePowers(obj) {
    obj = obj
      .replace("０", "0")
      .replace("１", "1")
      .replace("２", "2")
      .replace("３", "3")
      .replace("４", "4")
      .replace("５", "5")
      .replace("６", "6")
      .replace("７", "7")
      .replace("８", "8")
      .replace("９", "9");
    let _this = canvas.hud.enhancedcombathudsw5e.hudData;
    let convertPowerSlot;
    if (obj == _this.settings.localize.powers.pact) {
      convertPowerSlot = "pact";
    } else if (obj.match(/\d+/)) {
      convertPowerSlot = "power" + obj.match(/\d+/)[0];
    }
    let powerSlots = "";
    if (
      obj == _this.settings.localize.powers["0"] ||
      obj == _this.settings.localize.powers.will ||
      obj == _this.settings.localize.powers.innate
    ) {
      powerSlots =
        '<span class="power-slot power-cantrip"><i class="fas fa-infinity"></i></span>';
    } else {
      let powerSlotDetails = _this.powerSlots[convertPowerSlot];

      for (let index = 0; index < powerSlotDetails.max; index++) {
        //powerSlots.push(index < powerSlotDetails.value);
        powerSlots += `<span class="power-slot power-${
          index < powerSlotDetails.max - powerSlotDetails.value
            ? "used"
            : "available"
        }"></span>`;
      }
    }
    return powerSlots;
  }

  updatePowerSlots() {
    $(this.element)
      .find(".feature-power-slots")
      .each((index, element) => {
        let powerSlot = element.dataset.type;
        element.innerHTML = CombatHudCanvasElement.generatePowers(powerSlot);
      });
  }

  drawTooltip(itemName, offset, type) {
    const showTooltip = game.settings.get("enhancedcombathudsw5e", "showTooltips");
    const showTooltipSpecial = game.settings.get(
      "enhancedcombathudsw5e",
      "showTooltipsSpecial"
    );
    const showTooltipSkills = true; /*game.settings.get(
      "enhancedcombathudsw5e",
      "showTooltipSkills"
    );*/
    if (
      !showTooltip ||
      (type == "save" &&
        !game.settings.get(
          "enhancedcombathudsw5e",
          "showTooltipsAbilityMenuAbilities"
        )) ||
      (type == "skill" &&
        !game.settings.get(
          "enhancedcombathudsw5e",
          "showTooltipsAbilityMenuSkills"
        )) ||
      (type == "tool" &&
        !game.settings.get("enhancedcombathudsw5e", "showTooltipsAbilityMenuTools"))
    )
      return;
    if (!showTooltipSpecial && ECHItems[itemName]) return;
    let item = this.hudData.actor.items.find((i) => i.data.name == itemName);
    let title;
    let description;
    let itemType;
    let subtitle;
    let target;
    let range;
    let properties = [];
    let dt;
    let damageTypes = [];
    let materialComponents = "";
    if (type == "skill") {
      title = game.sw5e.config.skills[itemName];
      description = this.hudData.skills[itemName].tooltip;
    } else if (type == "save") {
      title = game.sw5e.config.abilities[itemName];
      description = this.hudData.saves[itemName].tooltip;
    } else {
      if (!item) {
        item = {};
        item.data = ECHItems[itemName];
      }
      if (!item || !item.data) return;
      title = item.data.name;
      description = item.data.data.description.value;
      itemType = item.data.type;
      subtitle;
      target = item.labels?.target || "-";
      range = item.labels?.range || "-";
      properties = [];
      dt = item.labels?.damageTypes?.split(", ");
      damageTypes = dt && dt.length ? dt : [];
      materialComponents = "";
      switch (itemType) {
        case "weapon":
          subtitle = game.sw5e.config.weaponTypes[item.data.data.weaponType];
          properties.push(
            game.sw5e.config.itemActionTypes[item.data.data.actionType]
          );
          for (let [key, value] of Object.entries(item.data.data.properties)) {
            let prop =
              value && game.sw5e.config.weaponProperties[key]
                ? game.sw5e.config.weaponProperties[key]
                : undefined;
            if (prop) properties.push(prop);
          }

          break;
        case "power":
          subtitle = `${item.labels.level} ${item.labels.school}`;
          properties.push(
            game.sw5e.config.powerSchools[item.data.data.school]
          );
          properties.push(item.labels.duration);
          properties.push(item.labels.save);
          for (let comp of item.labels.components) {
            properties.push(game.sw5e.config.powerComponents[comp]);
          }
          if (item.labels.materials) materialComponents = item.labels.materials;
          break;
        case "consumable":
          subtitle =
            game.sw5e.config.consumableTypes[item.data.data.consumableType] +
            " " +
            item.data.data.chatFlavor;
          properties.push(
            game.sw5e.config.itemActionTypes[item.data.data.actionType]
          );
          break;
        case "classfeature":
        case "deploymentfeature":
        case "feat":
        case "fightingmastery":
        case "fightingstyle":
        case "lightsaberform":
        case "starshipfeature":
        case "venture":
          subtitle = item.data.data.requirements;
          properties.push(
            game.sw5e.config.itemActionTypes[item.data.data.actionType]
          );
          break;
      }
    }

    const tooltip = ({
      title,
      subtitle,
      description,
      target,
      range,
      properties,
      materialComponents,
    }) => {
      target = target || "-";
      range = range || "-";
      return `<div class="ech-tooltip 
        ${!subtitle ? "hide-subtitle" : ""} 
        ${target == "-" && range == "-" ? "hideTargetRange" : ""}
        ${properties.length == 0 ? "hideProperties" : ""}
        ">
          <div class="ech-tooltip-header">
            <h2>${title}</h2>
          </div>
          <div class="ech-tooltip-body">
            <h4 class="ech-tooltip-subtitle">${subtitle}</h4>
            <div class="ech-tooltip-description">${description}</div>
            <div class="ech-tooltip-details">
              <div>
                <span>${game.i18n.localize(
                  "enhancedcombathudsw5e.tooltip.target.name"
                )}</span>
                <span>${target}</span>
              </div>
              <div>
                <span>${game.i18n.localize(
                  "enhancedcombathudsw5e.tooltip.range.name"
                )}</span>
                <span>${range}</span></div>
              </div>
            <div class="ech-tooltip-properties">
              <h3>${game.i18n.localize(
                "enhancedcombathudsw5e.tooltip.properties.name"
              )}</h3>
              ${properties.join("\n")}
            </div>
            <i style="font-size: 0.8rem;">${
              materialComponents.length > 0 ? "*-" + materialComponents : ""
            }</i>
          </div>
        </div>`;
    };

    let listOfProperties = [];
    for (let damt of damageTypes) {
      if (damt)
        listOfProperties.push(
          `<span class="ech-tooltip-badge damt">${damt}</span>`
        );
    }
    for (let prop of properties) {
      if (prop)
        listOfProperties.push(
          `<span class="ech-tooltip-badge prop">${prop}</span>`
        );
    }
    $(".ech-tooltip").remove();
    $(".extended-combat-hud").before(
      tooltip({
        title: title,
        subtitle: subtitle,
        description: description,
        target: target,
        range: range,
        properties: listOfProperties,
        materialComponents: materialComponents,
      })
    );
    $(".extended-combat-hud").off("wheel");
    $(".extended-combat-hud").on("wheel", function (event) {
      let $tooltipDesc = $(".ech-tooltip")
        .last()
        .find(".ech-tooltip-description");
      if (!$tooltipDesc[0]) return;
      let scrollPosition = $tooltipDesc[0].scrollTop;
      $tooltipDesc[0].scrollTop = scrollPosition + event.originalEvent.deltaY;
    });

    if (type == "save" || type == "skill" || type == "tool") {
      offset.top = offset.top - $(".ech-tooltip").last().height() / 2;
    } else {
      offset.top = offset.top - $(".ech-tooltip").last().height() - 10;
      offset.left = offset.left - $(".ech-tooltip").last().width() / 2;
      if (offset.left + $(".ech-tooltip").last().width() > $(window).width()) {
        offset.left -=
          offset.left + $(".ech-tooltip").last().width() - $(window).width();
      }
    }

    $(".ech-tooltip")
      .last()
      .css({
        top: `${offset.top < 0 ? 0 : offset.top}px`,
        left: `${offset.left}px`,
      })
      .addClass("ech-show-tooltip");
  }

  async dragDropSet(set, itemid, target) {
    let item = this.hudData.actor.data.items.find((i) => i.id == itemid);
    if (!item) return;
    let ps = set.substring(4, set.length) == "p" ? "primary" : "secondary";
    let oldSetItem = this.hudData.sets[set.substring(0, set.length - 1)][ps];
    if (oldSetItem) await oldSetItem.setFlag("enhancedcombathudsw5e", set, false);
    await item.setFlag("enhancedcombathudsw5e", set, true);
    $(target).css({
      "background-image": `url(${
        this.hudData.sets[set.substring(0, set.length - 1)][ps].data.img
      }`,
    });
    this.initSets();
  }

  async dragDropSetRemove(set, target) {
    let ps = set.substring(4, set.length) == "p" ? "primary" : "secondary";
    let oldSetItem = this.hudData.sets[set.substring(0, set.length - 1)][ps];
    if (oldSetItem) {
      await oldSetItem.setFlag("enhancedcombathudsw5e", set, false);
      $(this.element)
        .find(`[data-set="${set}"]`)
        .css({ "background-image": `` });
    }
    this.initSets();
  }
}

class ECHDiceRoller {
  constructor(actor) {
    this.actor = actor;
    this.modules = {
      betterRolls: game.modules.get("betterrolls5e")?.active,
    };
  }
  async rollItem(itemName) {
    if (this.modules.betterRolls) {
      //return await BetterRolls.quickRollByName(this.actor.data.name, itemName);
      const actorId = this.actor.id;
      const actorToRoll =
        canvas.tokens.placeables.find((t) => t.actor?.id === actorId)?.actor ??
        game.actors.get(actorId);
      const itemToRoll = actorToRoll?.items.find(
        (i) => i.data.name === itemName
      );
      if (game.modules.get("itemacro")?.active && itemToRoll.hasMacro()) {
        return itemToRoll.executeMacro();
      }

      if (!itemToRoll) {
        return ui.notifications.warn(
          game.i18n.format("SW5E.ActionWarningNoItem", {
            item: itemId,
            name: actorToRoll?.name ?? "[Not Found]",
          })
        );
      }

      return itemToRoll.roll({ vanilla: false });
    }
    return await game.sw5e.rollItemMacro(itemName);
  }

  async rollTool(itemName, abil, event) {
    // TODO: Use better rolls
    this.actor.items.find((i) => i.data.name == itemName).rollToolCheck();
    Hooks.once("renderDialog", (dialog, html) => {
      html.find('select[name="ability"]')[0].value = abil;
    });
    this.hijackDialog(event);
  }

  async rollSave(ability, event) {
    if (this.modules.betterRolls) BetterRolls.rollSave(this.actor, ability);
    else {
      this.actor.rollAbilitySave(ability);
      // Set Dialog Position
      this.hijackDialog(event);
    }
  }
  async rollSkill(skill, ability, event) {
    const skl = this.actor.data.data.skills[skill];
    if (skl.ability == ability && this.modules.betterRolls) {
      BetterRolls.rollSkill(this.actor, skill);
      return;
    }
    else {
      BetterRolls.rollSkill(this.actor, `${ability}|${skill}`);
      return;
    }
  }
  hijackDialog(event) {
    let $element = $(event.currentTarget).closest(".ability");
    const offset = $element.offset();

    // Close Previous Highjacked Windows
    $(".ech-highjack-window .close").trigger("click");

    // Position Windows next to Saves/Skills/Tools Menu
    Hooks.once("renderDialog", (dialog, html) => {
      offset.top += -$(document).scrollTop() - dialog.position.height / 2;
      offset.left +=
        $element[0].getBoundingClientRect().width +
        10 -
        $(document).scrollLeft();

      html
        .css({
          top: offset.top > 0 ? offset.top : 0,
          left: offset.left,
        })
        .addClass("ech-highjack-window");

      // Update dialog with new position data for dragging.
      dialog.position.left = offset.left;
      dialog.position.top = offset.top > 0 ? offset.top : 0;

      // If Dialog allows you to select Modifier, use modifier from ability modifier by default
      if (!html.find('select[name="ability"]'))
        html.find('select[name="ability"]').val($element.data("modifier"));
    });
  }

  async rollCheck(ability, event) {
    // Set Dialog Position
    this.hijackDialog(event);
    if (this.modules.betterRolls)
      return await BetterRolls.rollCheck(this.actor, ability);
    return await this.actor.rollAbilityTest(ability);
  }

  static sw5eRollSkill(skillId, options = {}) {
    const skl = this.data.data.skills[skillId];
    const bonuses = getProperty(this.data.data, "bonuses.abilities") || {};

    // Compose roll parts and data
    const parts = ["@mod"];
    const data = { mod: skl.mod + skl.prof };

    // Ability test bonus
    if (bonuses.check) {
      data["checkBonus"] = bonuses.check;
      parts.push("@checkBonus");
    }

    // Skill check bonus
    if (bonuses.skill) {
      data["skillBonus"] = bonuses.skill;
      parts.push("@skillBonus");
    }

    // Add provided extra roll parts now because they will get clobbered by mergeObject below
    if (options.parts?.length > 0) {
      parts.push(...options.parts);
    }

    // Reliable Talent applies to any skill check we have full or better proficiency in
    const reliableTalent =
      skl.value >= 1 && this.getFlag("sw5e", "reliableTalent");

    // Roll and return
    const rollData = foundry.utils.mergeObject(
      {
        parts: parts,
        data: data,
        title: game.i18n.format("SW5E.SkillPromptTitle", {
          skill: CONFIG.SW5E.skills[skillId],
        }),
        halflingLucky: this.getFlag("sw5e", "halflingLucky"),
        reliableTalent: reliableTalent,
        messageData: {
          speaker: options.speaker || ChatMessage.getSpeaker({ actor: this }),
          "flags.sw5e.roll": { type: "skill", skillId },
        },
      },
      options
    );
    return game.sw5e.dice.d20Roll(rollData);
  }
}

Hooks.once("init", () => {
  Hooks.on("renderHeadsUpDisplay", async (app, html, data) => {
    //html.append('<template id="enhancedcombathudsw5e"></template>');
    canvas.hud.enhancedcombathudsw5e = new CombatHudCanvasElement();
  });
});

Hooks.on("updateActor", (actor, updates) => {
  if (
    actor.id == canvas.hud.enhancedcombathudsw5e?.hudData?.actor?.id &&
    (updates?.data?.attributes?.ac?.value ||
      updates?.data?.attributes?.hp?.value ||
      updates?.data?.attributes?.hp?.max)
  ) {
    let ad = actor.data.data.attributes;
    canvas.hud.enhancedcombathudsw5e.updatePortrait(
      ad.hp.value,
      ad.hp.max,
      ad.ac.value
    );
  }
});

Hooks.on("updateActiveEffect", (activeEffect, updates) => {
  let actor = activeEffect.parent;
  if (!actor || actor?.id != canvas.hud.enhancedcombathudsw5e?.hudData?.actor?.id)
    return;
  let ad = actor.data.data.attributes;
  for (let change of activeEffect.data.changes) {
    if (change.key == "data.attributes.ac.value") {
      canvas.hud.enhancedcombathudsw5e.updatePortrait(
        ad.hp.value,
        ad.hp.max,
        ad.ac.value
      );
      return;
    }
  }
});

Hooks.on("updateItem", (item, updates) => {
  let actor = item.parent;
  if (!actor || actor?.id != canvas.hud.enhancedcombathudsw5e?.hudData?.actor?.id)
    return;
  let ad = actor.data.data.attributes;
  if (updates?.data?.equipped !== undefined) {
    canvas.hud.enhancedcombathudsw5e.updatePortrait(
      ad.hp.value,
      ad.hp.max,
      ad.ac.value
    );
    return;
  }
});

Hooks.on("controlToken", (token, controlled) => {
  if (
    controlled &&
    canvas.hud.enhancedcombathudsw5e?.rendered &&
    canvas.hud.enhancedcombathudsw5e.hudData.token.id != token.id
  ) {
    canvas.hud.enhancedcombathudsw5e.close();
    setTimeout(() => {
      canvas.hud.enhancedcombathudsw5e.bind(canvas.tokens.get(token.id));
    }, 250);
  }
});

Hooks.on("preUpdateToken", (token, updates) => {
  if (
    token.actor &&
    canvas.hud.enhancedcombathudsw5e?.hudData?.actor?.id == token.actor.id &&
    game.combat?.started &&
    ("x" in updates || "y" in updates)
  ) {
    let ttoken = canvas.tokens.get(token.id);
    let newX = updates.x || ttoken.x;
    let newY = updates.y || ttoken.y;
    let oldX = ttoken.x;
    let oldY = ttoken.y;
    const ray = new Ray({ x: oldX, y: oldY }, { x: newX, y: newY });
    const segments = [{ ray }];
    let distance = Math.floor(
      canvas.grid.measureDistances(segments, { gridSpaces: true }) /
        canvas.dimensions.distance
    );
    canvas.hud.enhancedcombathudsw5e.hudData.other.movement.moved += distance;
    const bars = Math.floor(
      canvas.hud.enhancedcombathudsw5e.hudData.other.movement.moved /
        canvas.hud.enhancedcombathudsw5e.hudData.other.movement.max
    );
    canvas.hud.enhancedcombathudsw5e.hudData.other.movement.current =
      canvas.hud.enhancedcombathudsw5e.hudData.other.movement.moved -
      bars * canvas.hud.enhancedcombathudsw5e.hudData.other.movement.max;
    canvas.hud.enhancedcombathudsw5e.updateMovement(bars);
  }
});

Hooks.on("updateCombat", (combat, updates) => {
  if (canvas.hud.enhancedcombathudsw5e?.hudData && "round" in updates) {
    canvas.hud.enhancedcombathudsw5e.newRound();
  }
  canvas.hud.enhancedcombathudsw5e?.updatePass();
});

Hooks.on("deleteCombat", (combat, updates) => {
  canvas.hud.enhancedcombathudsw5e?.newRound();
});
