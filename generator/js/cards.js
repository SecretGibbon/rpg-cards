// ============================================================================
// Card definition related functions
// ============================================================================
function card_default_options() {
    return {
        foreground_color: "white",
        background_color: "white",
        default_color: "black",
        default_icon: "ace",
        default_title_size: "13",
        page_size: "A4",
        page_rows: 3,
        page_columns: 3,
        card_arrangement: "doublesided",
        card_size: "25x35",
        card_count: null,
        icon_inline: true,
        rounded_corners: true
    };
}

function card_default_data() {
    return {
        count: 1,
        title: "New card",
        contents: [],
        tags: [],
        ability_mods: [],
        level: 0
    };
}

function card_init(card) {
    card.title = card.title || "";
    card.contents = card.contents || [];
    card.tags = card.tags || [];
}

function card_has_tag(card, tag) {
    tag = tag.trim().toLowerCase();
    var index = card.tags.indexOf(tag);
    return index > -1;
}

function card_add_tag(card, tag) {
    tag = tag.trim().toLowerCase();
    var index = card.tags.indexOf(tag);
    if (index === -1) {
        card.tags.push(tag);
    }
}

function card_remove_tag(card, tag) {
    tag = tag.trim().toLowerCase();
    card.tags = card.tags.filter(function (t) {
        return tag !== t;
    });
}

// ============================================================================
// Card definition related functions
// ============================================================================

function card_data_color_front(card_data, options) {
    return card_data.color_front || card_data.color || options.default_color || "black";
}

function card_data_color_back(card_data, options) {
    return card_data.color_back || card_data.color || options.default_color || "black";
}

function card_data_icon_front(card_data, options) {
    return card_data.icon_front || card_data.icon || options.default_icon || "ace";
}

function card_data_icon_back(card_data, options) {
    return card_data.icon_back || card_data.icon || options.default_icon || "ace";
}

function card_data_split_params(value) {
    return value.split("|").map(function (str) { return str.trim(); });
}

// ============================================================================
// Card element generating functions
// ============================================================================

function card_element_title(card_data, options) {
    var title = card_data.title || "";
    var title_size = card_data.title_size || options.default_title_size || 'normal';
    return '<div class="card-title card-title-' + title_size + '">' + title + '</div>';
}

function card_element_icon(card_data, options) {
    var icon = card_data_icon_front(card_data, options);
    var classname = "icon";
    if (options.icon_inline) {
        classname = "inlineicon";
    }

    var result = "";
    result += '<div class="card-title-' + classname + '-container">';
    result += '    <div class="card-title-' + classname + ' icon-' + icon + '">';
    result += '    </div>';
    result += '</div>';
    return result;
}

function card_element_subtitle(params, card_data, options) {
    var subtitle = params[0] || "";
    return '<div class="card-element card-subtitle">' + subtitle + '</div>';
}

function card_element_inline_icon(params, card_data, options) {
    var icon = params[0] || "";
    var size = params[1] || "40";
    var align = params[2] || "center";
    var color = card_data_color_front(card_data, options);
    return '<div class="card-element card-inline-icon align-' + align + ' icon-' + icon + '" style ="height:' + size + 'px;min-height:' + size + 'px;width: ' + size + 'px;background-color: ' + color + '"></div>';
}

function card_element_picture(params, card_data, options) {
    var url = params[0] || "";
    var height = params[1] || "";
    return '<div class="card-element card-picture" style ="background-image: url(&quot;' + url + '&quot;); background-size: contain; background-position: center;background-repeat: no-repeat; height:' + height + 'px"></div>';
}

function card_element_ruler(params, card_data, options) {
    var color = card_data_color_front(card_data, options);
    var fill = 'fill="' + color + '"';
    var stroke = 'stroke="' + color + '"';

    var result = "";
    result += '<svg class="card-ruler" height="1" width="100" viewbox="0 0 100 1" preserveaspectratio="none" xmlns="http://www.w3.org/2000/svg">';
    result += '    <polyline points="0,0 100,0.5 0,1" ' + fill + '></polyline>';
    result += '</svg>';
    return result;
}

function card_element_boxes(params, card_data, options) {
    var color = card_data_color_front(card_data, options);
    var fill = ' fill="none"';
    var stroke = ' stroke="' + color + '"';
    var count = params[0] || 1;
    var size = params[1] || 3;
    var style = 'style="width:' + size + 'em;height:' + size + 'em"';

    var result = "";
    result += '<div class="card-element card-description-line">';
    for (var i = 0; i < count; ++i) {
        result += '<svg class="card-box" height="100" width="100" viewbox="0 0 100 100" preserveaspectratio="none" xmlns="http://www.w3.org/2000/svg" ' + style + '>';
        result += '    <rect x="5" y="5" width="90" height="90" ' + fill + stroke + ' style="stroke-width:10">';
        result += '</svg>';
    }
    result += '</div>';
    return result;
}

function card_element_startcolumns(params, card_data, options) {;
    let count = params[0] || 2;
    let padding = params[1] || 0;
    let align = params[2] || "left";
    let width = 100 / count;
    let result = '<div style="display: flex; text-align: ' + align + ';">';
    result += '<div class="card-element" style="width: ' + width + '%; padding-left: ' + padding + 'px; padding-right: ' + padding + 'px">';
    return result;
}

function card_element_endcolumns(params, card_data, options) {
    return '</div></div>'
}

function card_element_nextcolumn(params, card_data, options) {
    var count = params[0] || 2;
    let padding = params[1] || 0;
    var width = 100 / count;
    return '</div><div class="card-element" style="width: ' + width + '%; padding-left: ' + padding + 'px; padding-right: ' + padding + 'px">'
}

function card_element_property(params, card_data, options) {
    var result = "";
    result += '<div class="card-element card-property-line">';
    result += '   <h4 class="card-property-name">' + params[0] + '</h4>';
    result += '   <p class="card-p card-property-text">' + params[1] + '</p>';
	if (params[2])
	{
		result += '   <div style="float:right">';
		result += '       <h4 class="card-property-name">' + params[2] + '</h4>';
		result += '       <p class="card-p card-property-text">' + params[3] + '</p>';
		result += '   </div>';
	}
    result += '</div>';
    return result;
}

function card_element_description(params, card_data, options) {
    var result = "";
    result += '<div class="card-element card-description-line">';
    result += '   <h4 class="card-description-name">' + params[0] + '</h4>';
    result += '   <p class="card-p card-description-text">' + params[1] + '</p>';
    result += '</div>';
    return result;
}

function card_element_text(params, card_data, options) {
    var result = "";
    result += '<div class="card-element card-description-line">';
    result += '   <p class="card-p card-description-text">' + params[0] + '</p>';
    result += '</div>';
    return result;
}

function card_element_info(params, card_data, options) {
    var result = "";
    result += '<div class="card-element card-description-line">';
    result += '   <p class="card-p card-description-text" style="font-size: 0.8em;">' + params[0] + '</p>';
    result += '</div>';
    return result;
}

function card_element_center(params, card_data, options) {
    var result = "";
    result += '<div class="card-element card-description-line" style="text-align: center">';
    result += '   <p class="card-p card-description-text">' + params[0] + '</p>';
    result += '</div>';
    return result;
}

function card_element_justify(params, card_data, options) {
    var result = "";
    result += '<div class="card-element card-description-line" style="text-align: justify; hyphens: auto">';
    result += '   <p class="card-p card-description-text">' + params[0] + '</p>';
    result += '</div>';
    return result;
}

function card_element_dndclasses(params, card_data, options) {
    let result = "";
    card_data.level = 0;
    result += '<div class="card-element card-description-line">';
    for (let i = 0; i < params.length; i += 2) {
        let level = parseInt(params[i+1], 10) || 0;
        result += '   <h4 class="card-description-name">' + params[i] + ' (' + level + ')</h4>';
        card_data.level += level;
    }
    let levelProficiency = card_data.level < 5 ? 2 : (card_data.level < 9 ? 3 : (card_data.level < 13 ? 4 : (card_data.level < 17 ? 5 : 6)));
    result += '   <h4 class="card-description-name">Proficiency +' + levelProficiency + '</h4>';
    result += '</div>';
    return result;
}

function card_element_dndstats(params, card_data, options) {
    var stats = [10, 10, 10, 10, 10, 10];
    var mods = [0,0,0,0,0,0];
    card_data.ability_mods = [0,0,0,0,0,0];
    for (var i = 0; i < 6; ++i) {
        stats[i] = parseInt(params[i], 10) || 0;
        var mod = Math.floor(((stats[i] - 10) / 2));
        card_data.ability_mods[i] = mod;
        if (mod >= 0) {
            mod = "+" + mod;
        } else {
            mod = "" + mod;
        }
        mods[i] = "&nbsp;(" + mod + ")";
    }

    var result = "";
    result += '<table class="card-stats">';
    result += '    <tbody><tr>';
    result += '      <th class="card-stats-header">STR</th>';
    result += '      <th class="card-stats-header">DEX</th>';
    result += '      <th class="card-stats-header">CON</th>';
    result += '      <th class="card-stats-header">INT</th>';
    result += '      <th class="card-stats-header">WIS</th>';
    result += '      <th class="card-stats-header">CHA</th>';
    result += '    </tr>';
    result += '    <tr>';
    result += '      <td class="card-stats-cell">' + stats[0] + mods[0] + '</td>';
    result += '      <td class="card-stats-cell">' + stats[1] + mods[1] + '</td>';
    result += '      <td class="card-stats-cell">' + stats[2] + mods[2] + '</td>';
    result += '      <td class="card-stats-cell">' + stats[3] + mods[3] + '</td>';
    result += '      <td class="card-stats-cell">' + stats[4] + mods[4] + '</td>';
    result += '      <td class="card-stats-cell">' + stats[5] + mods[5] + '</td>';
    result += '    </tr>';
    result += '  </tbody>';
    result += '</table>';
    return result;
}

function card_element_dndsaves(params, card_data, options) {
    let proficiencies = [0, 0, 0, 0, 0, 0];
    for (let i = 0; i < params.length; i ++) {
        if (params[i].toLowerCase() === "str" || params[i].toLowerCase() === "strength") {
            proficiencies[0] ++;
        }
        if (params[i].toLowerCase() === "dex" || params[i].toLowerCase() === "dexterity") {
            proficiencies[1] ++;
        }
        if (params[i].toLowerCase() === "con" || params[i].toLowerCase() === "constitution") {
            proficiencies[2] ++;
        }
        if (params[i].toLowerCase() === "int" || params[i].toLowerCase() === "intelligence") {
            proficiencies[3] ++;
        }
        if (params[i].toLowerCase() === "wis" || params[i].toLowerCase() === "wisdom") {
            proficiencies[4] ++;
        }
        if (params[i].toLowerCase() === "cha" || params[i].toLowerCase() === "charisma") {
            proficiencies[5] ++;
        }
    }
    let levelProficiency = card_data.level < 5 ? 2 : (card_data.level < 9 ? 3 : (card_data.level < 13 ? 4 : (card_data.level < 17 ? 5 : 6)));

    let result = "";
    result += '<table class="card-stats">';
    result += '    <tbody><tr>';
    result += '      <th class="card-stats-header">STR</th>';
    result += '      <th class="card-stats-header">DEX</th>';
    result += '      <th class="card-stats-header">CON</th>';
    result += '      <th class="card-stats-header">INT</th>';
    result += '      <th class="card-stats-header">WIS</th>';
    result += '      <th class="card-stats-header">CHA</th>';
    result += '    </tr>';
    result += '    <tr>';
    for (let i = 0; i < 6; i++) {
        let savingThrowBonus = card_data.ability_mods[i] + (proficiencies[i] > 0 ? levelProficiency : 0);
        if (savingThrowBonus > 0) {
            savingThrowBonus = "+" + savingThrowBonus;
        }
        result += '      <td class="card-stats-cell">' + savingThrowBonus + '</td>';
    }
    result += '    </tr>';
    result += '  </tbody>';
    result += '</table>';
    return result;
}

function add_skill_proficiency(name, proficiencies) {
    if (proficiencies[name.toLowerCase()] === 1) {
        proficiencies[name.toLowerCase()] = 2;
    } else {
        proficiencies[name.toLowerCase()] = 1;
    }
}

function card_element_dndskills(params, card_data, options) {
    let proficiencies = {};
    for (let i = 0; i < params.length; i ++) {
        if (params[i].toLowerCase() === "acr" || params[i].toLowerCase() === "acrobatics") {
            add_skill_proficiency("acrobatics", proficiencies);
        }
        if (params[i].toLowerCase() === "ani" || params[i].toLowerCase() === "animal handling") {
            proficiencies["animal handling"] ++;
        }
        if (params[i].toLowerCase() === "arc" || params[i].toLowerCase() === "arcana") {
            add_skill_proficiency("arcana", proficiencies);
        }
        if (params[i].toLowerCase() === "ath" || params[i].toLowerCase() === "athletics") {
            add_skill_proficiency("athletics", proficiencies);
        }
        if (params[i].toLowerCase() === "dec" || params[i].toLowerCase() === "deception") {
            add_skill_proficiency("deception", proficiencies);
        }
        if (params[i].toLowerCase() === "his" || params[i].toLowerCase() === "history") {
            add_skill_proficiency("history", proficiencies);
        }
        if (params[i].toLowerCase() === "ins" || params[i].toLowerCase() === "insight") {
            add_skill_proficiency("insight", proficiencies);
        }
        if (params[i].toLowerCase() === "int" || params[i].toLowerCase() === "intimidation") {
            add_skill_proficiency("intimidation", proficiencies);
        }
        if (params[i].toLowerCase() === "inv" || params[i].toLowerCase() === "investigation") {
            add_skill_proficiency("investigation", proficiencies);
        }
        if (params[i].toLowerCase() === "med" || params[i].toLowerCase() === "medicine") {
            add_skill_proficiency("medicine", proficiencies);
        }
        if (params[i].toLowerCase() === "nat" || params[i].toLowerCase() === "nature") {
            add_skill_proficiency("nature", proficiencies);
        }
        if (params[i].toLowerCase() === "prc" || params[i].toLowerCase() === "perception") {
            add_skill_proficiency("perception", proficiencies);
        }
        if (params[i].toLowerCase() === "prf" || params[i].toLowerCase() === "performance") {
            add_skill_proficiency("performance", proficiencies);
        }
        if (params[i].toLowerCase() === "prs" || params[i].toLowerCase() === "persuasion") {
            add_skill_proficiency("persuasion", proficiencies);
        }
        if (params[i].toLowerCase() === "rel" || params[i].toLowerCase() === "religion") {
            add_skill_proficiency("religion", proficiencies);
        }
        if (params[i].toLowerCase() === "sle" || params[i].toLowerCase() === "sleight of hand") {
            add_skill_proficiency("sleight of hand", proficiencies);
        }
        if (params[i].toLowerCase() === "ste" || params[i].toLowerCase() === "stealth") {
            add_skill_proficiency("stealth", proficiencies);
        }
        if (params[i].toLowerCase() === "sur" || params[i].toLowerCase() === "survival") {
            add_skill_proficiency("survival", proficiencies);
        }
    }
    console.log(options);

    let result = "";
    result += card_element_startcolumns([2, 5, "left"], card_data, options);
    result += '<table class="card-stats" style="font-size: 0.8em; border-right: solid '+ options.default_color + ' 1px; line-height: 0.95em;">';
    result += '    <tbody>';
    result += get_skill_row("Acrobatics", 1, card_data, proficiencies);
    result += get_skill_row("Animal Handling", 4, card_data, proficiencies);
    result += get_skill_row("Arcana", 3, card_data, proficiencies);
    result += get_skill_row("Athletics", 0, card_data, proficiencies);
    result += get_skill_row("Deception", 5, card_data, proficiencies);
    result += get_skill_row("History", 3, card_data, proficiencies);
    result += get_skill_row("Insight", 4, card_data, proficiencies);
    result += get_skill_row("Intimidation", 5, card_data, proficiencies);
    result += get_skill_row("Investigation", 3, card_data, proficiencies);
    result += '  </tbody>';
    result += '</table>';
    result += card_element_nextcolumn([2, 5], card_data, options);
    result += '<table class="card-stats" style="font-size: 0.8em; line-height: 0.95em;">';
    result += '    <tbody>';
    result += get_skill_row("Medicine", 4, card_data, proficiencies);
    result += get_skill_row("Nature", 3, card_data, proficiencies);
    result += get_skill_row("Perception", 4, card_data, proficiencies);
    result += get_skill_row("Performance", 5, card_data, proficiencies);
    result += get_skill_row("Persuasion", 5, card_data, proficiencies);
    result += get_skill_row("Religion", 3, card_data, proficiencies);
    result += get_skill_row("Sleight Of Hand", 1, card_data, proficiencies);
    result += get_skill_row("Stealth",1, card_data, proficiencies);
    result += get_skill_row("Survival", 4, card_data, proficiencies);
    result += '  </tbody>';
    result += '</table>';
    result += card_element_endcolumns([], card_data, options);
    return result;
}

function get_skill_row(name, ability, card_data, proficiencies) {
    let result = "";
    let levelProficiency = card_data.level < 5 ? 2 : (card_data.level < 9 ? 3 : (card_data.level < 13 ? 4 : (card_data.level < 17 ? 5 : 6)));
    let value = card_data.ability_mods[ability] + ((proficiencies[name.toLowerCase()] || 0) * levelProficiency);
    result += '      <tr>';
    result += '        <th style="width: 90%;">' + name + '</th>';
    result += '        <td class="card-stats-cell" style="width: 20%;">' + value + '</td>';
    result += '      </tr>';
    return result;
}

function card_element_bullet(params, card_data, options) {
    var result = "";
    result += '<ul class="card-element card-bullet-line">';
    result += '   <li class="card-bullet">' + params[0] + '</li>';
    result += '</ul>';
    return result;
}

function card_element_section(params, card_data, options) {
    var color = card_data_color_front(card_data, options);
    var section = params[0] || "";
    return '<h3 class="card-section" style="color:' + color + '">' + section + '</h3>';
}

function card_element_fill(params, card_data, options) {
    var flex = params[0] || "1";
    return '<span class="card-fill" style="flex:' + flex + '"></span>';
}

function card_element_unknown(params, card_data, options) {
    return '<div>Unknown element: ' + params.join('<br />') + '</div>';
}

function card_element_empty(params, card_data, options) {
    return '';
}

var card_element_generators = {
    subtitle: card_element_subtitle,
    property: card_element_property,
    rule: card_element_ruler,
    ruler: card_element_ruler,
    boxes: card_element_boxes,
    description: card_element_description,
    dndclasses: card_element_dndclasses,
    dndstats: card_element_dndstats,
    dndsaves: card_element_dndsaves,
    dndskills: card_element_dndskills,
    text: card_element_text,
    info: card_element_info,
    center: card_element_center,
    justify: card_element_justify,
    bullet: card_element_bullet,
    fill: card_element_fill,
    section: card_element_section,
    disabled: card_element_empty,
    picture: card_element_picture,
    icon: card_element_inline_icon,
    startcolumns: card_element_startcolumns,
    endcolumns: card_element_endcolumns,
    nextcolumn: card_element_nextcolumn
};

// ============================================================================
// Card generating functions
// ============================================================================

function card_generate_contents(contents, card_data, options) {
    var result = "";
    result += '<div class="card-content-container">';
    result += contents.map(function (value) {
        var parts = card_data_split_params(value);
        var element_name = parts[0];
        var element_params = parts.splice(1);
        var element_generator = card_element_generators[element_name];
        if (element_generator) {
            return element_generator(element_params, card_data, options);
        } else if (element_name.length > 0) {
            return card_element_unknown(element_params, card_data, options);
        }
    }).join("\n");
    result += '</div>';
    return result;
}

function card_repeat(card, count) {
    var result = [];
    for (var i = 0; i < count; ++i) {
        result.push(card);
    }
    return result;
}

function card_generate_color_style(color, options) {
    return 'style="color:' + color + '; border-color:' + color + '; background-color:' + color + '"';
}

function card_generate_color_gradient_style(color, options) {
    return 'style="background: radial-gradient(ellipse at center, white 20%, ' + color + ' 120%)"';
}

function card_generate_front(data, options) {
    var color = card_data_color_front(data, options);
    var style_color = card_generate_color_style(color, options);

    var result = "";
    result += '<div class="card card-size-' + options.card_size + ' ' + (options.rounded_corners ? 'rounded-corners' : '') + '" ' + style_color + '>';
    result += card_element_icon(data, options);
    result += card_element_title(data, options);
    result += card_generate_contents(data.contents, data, options);
    result += '</div>';

    return result;
}

function card_generate_back(data, options) {
    var color = card_data_color_back(data, options);
    var style_color = card_generate_color_style(color, options);
	var url = data.background_image;
	var background_style = "";
	if (url)
	{
		background_style = 'style = "background-image: url(&quot;' + url + '&quot;); background-size: contain; background-position: center; background-repeat: no-repeat;"';
	}
	else 
	{
		background_style = card_generate_color_gradient_style(color, options);
    }
	var icon = card_data_icon_back(data, options);

    var result = "";
    console.log('options.rounded_corners', options.rounded_corners);
    result += '<div class="card card-size-' + options.card_size + ' ' + (options.rounded_corners ? 'rounded-corners' : '') + '" ' + style_color + '>';
    result += '  <div class="card-back" ' + background_style + '>';
	if (!url)
	{
		result += '    <div class="card-back-inner">';
		result += '      <div class="card-back-icon icon-' + icon + '" ' + style_color + '></div>';
		result += '    </div>';
	}
    result += '  </div>';
    result += '</div>';

    return result;
}

function card_generate_empty(count, options) {
    var style_color = card_generate_color_style("white");

    var result = "";
    result += '<div class="card card-size-' + options.card_size + '" ' + style_color + '>';
    result += '</div>';

    return card_repeat(result, count);
}

// ============================================================================
// Functions that generate pages of cards
// ============================================================================

function card_pages_split(data, rows, cols) {
    var cards_per_page = rows * cols;
    var result = [];
    for (var i = 0; i < data.length; i += cards_per_page) {
        var page = data.slice(i, i + cards_per_page);
        result.push(page);
    }
    return result;
}

function card_pages_merge(front_pages, back_pages) {
    var result = [];
    for (var i = 0; i < front_pages.length; ++i) {
        result.push(front_pages[i]);
        result.push(back_pages[i]);
    }
    return result;
}

function cards_pages_flip_left_right(cards, rows, cols) {
    var result = [];
    for (var r = 0; r < rows; ++r) {
        for (var c = 0; c < cols; ++c) {
            var i = r*cols + (cols-1-c);
            result.push(cards[i]);
        }
    }
    return result;
}

function card_pages_add_padding(cards, options) {
    var cards_per_page = options.page_rows * options.page_columns;
    var last_page_cards = cards.length % cards_per_page;
    if (last_page_cards !== 0) {
        return cards.concat(card_generate_empty(cards_per_page - last_page_cards, options));
    } else {
        return cards;
    }
}

function card_pages_interleave_cards(front_cards, back_cards, options) {
    var result = [];
    var i = 0;
    while (i < front_cards.length) {
        result.push(front_cards[i]);
        result.push(back_cards[i]);
        if (options.page_columns > 2) {
            result.push(card_generate_empty(options.page_columns - 2, options));
        }
        ++i;
    }
    return result;
}

function card_pages_wrap(pages, options) {
    var size = options.page_size || "A4";

    var result = "";
    for (var i = 0; i < pages.length; ++i) {
        var style = "";
        if ((options.card_arrangement === "doublesided") &&  (i % 2 === 1)) {
            style += 'style="background-color:' + options.background_color + '"';
        } else {
            style += 'style="background-color:' + options.foreground_color + '"';
        }
        result += '<page class="page page-preview" size="' + size + '" ' + style + '>\n';
        result += pages[i].join("\n");
        result += '</page>\n';
    }
    return result;
}

function card_pages_generate_style(options) {
    var size = "a4";
    switch (options.page_size) {
        case "A3": size = "A3 portrait"; break;
        case "A4": size = "210mm 297mm"; break;
        case "A5": size = "A5 portrait"; break;
        case "Letter": size = "letter portrait"; break;
        case "25x35": size = "2.5in 3.5in"; break;
        default: size = "auto";
    }

    var result = "";
    result += "<style>\n";
    result += "@page {\n";
    result += "    margin: 0;\n";
    result += "    size:" + size + ";\n";
    result += "    -webkit-print-color-adjust: exact;\n";
    result += "}\n";
    result += "</style>\n";
    return result;
}

function card_pages_generate_html(card_data, options) {
    options = options || card_default_options();
    var rows = options.page_rows || 3;
    var cols = options.page_columns || 3;

    // Generate the HTML for each card
    var front_cards = [];
    var back_cards = [];
    card_data.forEach(function (data) {
        var count = options.card_count || data.count || 1;
        var front = card_generate_front(data, options);
        var back = card_generate_back(data, options);
        front_cards = front_cards.concat(card_repeat(front, count));
        back_cards = back_cards.concat(card_repeat(back, count));
    });

    var pages = [];
    if (options.card_arrangement === "doublesided") {
        // Add padding cards so that the last page is full of cards
        front_cards = card_pages_add_padding(front_cards, options);
        back_cards = card_pages_add_padding(back_cards, options);

        // Split cards to pages
        var front_pages = card_pages_split(front_cards, rows, cols);
        var back_pages = card_pages_split(back_cards, rows, cols);

        // Shuffle back cards so that they line up with their corresponding front cards
        back_pages = back_pages.map(function (page) {
            return cards_pages_flip_left_right(page, rows, cols);
        });

        // Interleave front and back pages so that we can print double-sided
        pages = card_pages_merge(front_pages, back_pages);
    } else if (options.card_arrangement === "front_only") {
        var cards = card_pages_add_padding(front_cards, options);
        pages = card_pages_split(cards, rows, cols);
    } else if (options.card_arrangement === "side_by_side") {
        var cards = card_pages_interleave_cards(front_cards, back_cards, options);
        cards = card_pages_add_padding(cards, options);
        pages = card_pages_split(cards, rows, cols);
    }

    // Wrap all pages in a <page> element and add CSS for the page size
    var result = "";
    result += card_pages_generate_style(options);
    result += card_pages_wrap(pages, options);

    return result;
}

function card_pages_insert_into(card_data, container) {

    // Clear the previous content of the document
    while (container.hasChildNodes()) {
        container.removeChild(container.lastChild);
    }

    // Insert the HTML
    var html = card_pages_generate_html(card_data);
    container.innerHTML = html;
}
