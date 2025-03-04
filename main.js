var fs = {'base': 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAdUlEQVQ4jaXTyw6AIAxE0Rni//8ybmgD9EHRrozJPTYQCaDjxzz61C8dEgDQICuMF9VYvtd0gSoyxQtQQrbYACnixC7gIkEMzLfgIBxIdkHuBjcTApQ1en6uLqCxTIIYwMQHZAHCOEEUOMYBQs1u/0nuwMd5AZjlIinlnTHmAAAAAElFTkSuQmCC'}

function genZip(wspa) {
    const idv = document.getElementById('id').value;
    const descriptionv = 'A Lcreator mod';
    const namev = document.getElementById('id').value;

    var zip = new JSZip();
    zip.file('init.lua', `print('init ${idv}')
${lua.luaGenerator.workspaceToCode(wspa).replaceAll('$((ID', idv)}`);
    zip.file('mod.conf', `name = ${namev}\ndescription = ${descriptionv}\ndepends = default`);
    var img = zip.folder('textures');
    for (let i in fs) {
        img.file(`${i}.png`, fs[i], {base64: true});
    }
    zip.generateAsync({type:"blob"})
    .then(function(content) {
        saveAs(content, `${idv}_mod.zip`);
    });
}

function dataURItoRawBase64(dataURI) {
    const parts = dataURI.split(',');
    if (parts.length < 2) {
      return "";
    }
    return parts[1];
}

function pngToBase64() {
    return new Promise((resolve, reject) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/png';
      input.onchange = (event) => {
        const file = event.target.files[0];
        if (!file) {
          reject('No file selected.');
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          const base64String = e.target.result;
          resolve(base64String);
        };
        reader.onerror = () => {
          reject('Error reading file.');
        };
        reader.readAsDataURL(file);
      };
      input.click();
    });
}

function newB64() {
    let nm = window.prompt('Enter texture name (only name, no extensions)', 'new_assest')
    pngToBase64()
        .then(base64String => {
            if (window.confirm(`Do you want to add this texture? Name: ${nm}`)) {
                console.log('Base64 string:', dataURItoRawBase64(base64String));
                fs[nm] = dataURItoRawBase64(base64String);
                dictionaryKeysToHTMLList(fs, 'ld');
            }
        })
        .catch(error => {
            console.error(error);
        });
}

function dictionaryKeysToHTMLList(dict, listId) {
    const keys = Object.keys(dict);
    const listElement = document.getElementById(listId);

    if (!listElement) {
      console.error(`Element with ID "${listId}" not found.`);
      return;
    }

    listElement.innerHTML = ''; // Clear existing list items

    keys.forEach(key => {
      const listItem = document.createElement('li');
      listItem.textContent = key;
      listElement.appendChild(listItem);
    });
}

function createModal(txt) {
    const modal = document.createElement('div');
    const modalContent = document.createElement('div');
    const textContent = document.createElement('p');
    const closeButton = document.createElement('button');
    const addButton = document.createElement('button');
    modal.style.position = 'fixed';
    modal.style.zIndex = '999';
    modal.style.border = '2px solid grey';
    modalContent.style.borderRadius = '5px';
    modalContent.style.top = '0';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modalContent.style.backgroundColor = '#fff';
    modalContent.style.width = '100px';
    modalContent.style.padding = '20px';
    textContent.style.color = 'rgba(0, 0, 0, 1)';
    textContent.innerHTML = txt;
    closeButton.style.width = '50%';
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', () => {
        modal.remove();
    });
    addButton.style.width = '50%';
    addButton.textContent = '+';
    addButton.addEventListener('click', () => {
        modal.remove();
        newB64();
    });
    modalContent.appendChild(textContent);
    modalContent.appendChild(closeButton);
    modalContent.appendChild(addButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
};

if (localStorage.getItem('b64IMG') !== null) {
    try {
        fs = JSON.parse(localStorage.getItem('b64IMG'));
        dictionaryKeysToHTMLList(fs, 'ld');
    } catch (error) {
        console.log(error);
        localStorage.setItem('b64IMG', JSON.stringify(fs))
    }
} else {
    localStorage.setItem('b64IMG', JSON.stringify(fs))
}

dictionaryKeysToHTMLList(fs, 'ld');

function lsD() {
    createModal(document.getElementById('ld').innerHTML);
}

Blockly.defineBlocksWithJsonArray([{
    "type": "node",
    "tooltip": "Creates a node.",
    "helpUrl": "",
    "message0": "node %1 id %2 %3 name %4 %5 image %6 %7 is ground content %8 %9 dropped node id %10 %11 hardness %12 %13 group %14 %15",
    "args0": [
      {
        "type": "input_dummy",
        "name": "NAME"
      },
      {
        "type": "field_input",
        "name": "ID",
        "text": "block1"
      },
      {
        "type": "input_dummy",
        "name": "NID",
        "align": "RIGHT"
      },
      {
        "type": "field_input",
        "name": "NAME",
        "text": "Block #1 :)"
      },
      {
        "type": "input_dummy",
        "name": "NNAME",
        "align": "RIGHT"
      },
      {
        "type": "field_input",
        "name": "IMG",
        "text": "base"
      },
      {
        "type": "input_dummy",
        "name": "NIMAGE",
        "align": "RIGHT"
      },
      {
        "type": "field_checkbox",
        "name": "ISGND",
        "checked": "TRUE"
      },
      {
        "type": "input_dummy",
        "name": "NMISC",
        "align": "RIGHT"
      },
      {
        "type": "field_input",
        "name": "DID",
        "text": `${document.getElementById('id').value}:block1`
      },
      {
        "type": "input_dummy",
        "name": "NMISC2",
        "align": "RIGHT"
      },
      {
        "type": "field_number",
        "name": "HARD",
        "value": 1,
        "min": 0,
        "max": 100
      },
      {
        "type": "input_dummy",
        "name": "NMISC3",
        "align": "RIGHT"
      },
      {
        "type": "field_dropdown",
        "name": "GRP",
        "options": [
          [
            "sword breaks node",
            "fleshy"
          ],
          [
            "spade breaks node",
            "crumbly"
          ],
          [
            "pickaxe breaks node",
            "cracky"
          ],
          [
            "fine tools (for leaves, etc.) break node",
            "snappy"
          ],
          [
            "axe breaks node",
            "choppy"
          ],
          [
            "prone to explosions",
            "explody"
          ],
          [
            "breakable by hand",
            "oddly_breakable_by_hand"
          ]
        ]
      },
      {
        "type": "input_dummy",
        "name": "NMISC4",
        "align": "RIGHT"
      }
    ],
    "colour": 225
},{
    "type": "node2",
    "tooltip": "Creates a node.",
    "helpUrl": "",
    "message0": "node %1 id %2 %3 name %4 %5 x+ %6 x- %7 %8 y+ %9 y- %10 %11 z+ %12 z- %13 %14 is ground content %15 %16 dropped node id %17 %18 hardness %19 %20 group %21 %22",
    "args0": [
      {
        "type": "input_dummy",
        "name": "NAME"
      },
      {
        "type": "field_input",
        "name": "ID",
        "text": "block1"
      },
      {
        "type": "input_dummy",
        "name": "NID",
        "align": "RIGHT"
      },
      {
        "type": "field_input",
        "name": "NAME",
        "text": "Block #1 :)"
      },
      {
        "type": "input_dummy",
        "name": "NNAME",
        "align": "RIGHT"
      },
      {
        "type": "field_input",
        "name": "xp",
        "text": "base"
      },
      {
        "type": "field_input",
        "name": "xm",
        "text": "base"
      },
      {
        "type": "input_dummy",
        "name": "NIMAGEX",
        "align": "RIGHT"
      },
      {
        "type": "field_input",
        "name": "yp",
        "text": "base"
      },
      {
        "type": "field_input",
        "name": "ym",
        "text": "base"
      },
      {
        "type": "input_dummy",
        "name": "NIMAGEY",
        "align": "RIGHT"
      },
      {
        "type": "field_input",
        "name": "zp",
        "text": "base"
      },
      {
        "type": "field_input",
        "name": "zm",
        "text": "base"
      },
      {
        "type": "input_dummy",
        "name": "NIMAGEZ",
        "align": "RIGHT"
      },
      {
        "type": "field_checkbox",
        "name": "ISGND",
        "checked": "TRUE"
      },
      {
        "type": "input_dummy",
        "name": "NMISC",
        "align": "RIGHT"
      },
      {
        "type": "field_input",
        "name": "DID",
        "text": `${document.getElementById('id').value}:block1`
      },
      {
        "type": "input_dummy",
        "name": "NMISC2",
        "align": "RIGHT"
      },
      {
        "type": "field_number",
        "name": "HARD",
        "value": 1,
        "min": 0,
        "max": 100
      },
      {
        "type": "input_dummy",
        "name": "NMISC3",
        "align": "RIGHT"
      },
      {
        "type": "field_dropdown",
        "name": "GRP",
        "options": [
          [
            "sword breaks node",
            "fleshy"
          ],
          [
            "spade breaks node",
            "crumbly"
          ],
          [
            "pickaxe breaks node",
            "cracky"
          ],
          [
            "fine tools (for leaves, etc.) break node",
            "snappy"
          ],
          [
            "axe breaks node",
            "choppy"
          ],
          [
            "prone to explosions",
            "explody"
          ],
          [
            "breakable by hand",
            "oddly_breakable_by_hand"
          ]
        ]
      },
      {
        "type": "input_dummy",
        "name": "NMISC4",
        "align": "RIGHT"
      }
    ],
    "colour": 225
},
{
  "type": "item",
  "tooltip": "Creates an item",
  "helpUrl": "",
  "message0": "item %1 id %2 %3 name %4 %5 image %6 %7",
  "args0": [
    {
      "type": "input_dummy",
      "name": "NAME"
    },
    {
      "type": "field_input",
      "name": "ID",
      "text": "item1"
    },
    {
      "type": "input_dummy",
      "name": "NID",
      "align": "RIGHT"
    },
    {
      "type": "field_input",
      "name": "NAME",
      "text": "Item #1 :)"
    },
    {
      "type": "input_dummy",
      "name": "NNAME",
      "align": "RIGHT"
    },
    {
      "type": "field_input",
      "name": "IMG",
      "text": "base"
    },
    {
      "type": "input_dummy",
      "name": "NIMG",
      "align": "RIGHT"
    }
  ],
  "colour": 120
},
{
  "type": "alias",
  "tooltip": "Creates an alias",
  "helpUrl": "",
  "message0": "alias:  %1 → %2 %3",
  "args0": [
    {
      "type": "field_input",
      "name": "I",
      "text": "default:dirt"
    },
    {
      "type": "field_input",
      "name": "O",
      "text": "dirt"
    },
    {
      "type": "input_dummy",
      "name": "MAIN"
    }
  ],
  "colour": 180
},{
  "type": "shapedcraft",
  "tooltip": "Defines a shaped crafting recipe",
  "helpUrl": "",
  "message0": "Shaped crafting recipe %1 output %2 x %3 %4 %5 %6 %7 %8 %9 %10 %11 %12 %13 %14 %15 %16",
  "args0": [
    {
      "type": "input_dummy",
      "name": "NAME"
    },
    {
      "type": "field_input",
      "name": "OUT",
      "text": "default:dirt"
    },
    {
      "type": "field_number",
      "name": "AMOUNT",
      "value": 5,
      "min": 1,
      "max": 99
    },
    {
      "type": "input_dummy",
      "name": "OUT",
      "align": "RIGHT"
    },
    {
      "type": "field_input",
      "name": "r1a",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "r1b",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "r1c",
      "text": ""
    },
    {
      "type": "input_dummy",
      "name": "R1",
      "align": "RIGHT"
    },
    {
      "type": "field_input",
      "name": "r2a",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "r2b",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "r2c",
      "text": ""
    },
    {
      "type": "input_dummy",
      "name": "R2",
      "align": "RIGHT"
    },
    {
      "type": "field_input",
      "name": "r3a",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "r3b",
      "text": ""
    },
    {
      "type": "field_input",
      "name": "r3c",
      "text": ""
    },
    {
      "type": "input_dummy",
      "name": "R3",
      "align": "RIGHT"
    }
  ],
  "colour": 180
},{
  "type": "fuel",
  "tooltip": "Registers an item/block as fuel",
  "helpUrl": "",
  "message0": "define %1 as fuel %2 burntime: %3 second(s) %4",
  "args0": [
    {
      "type": "field_input",
      "name": "NAME",
      "text": `${document.getElementById('id').value}:item1`
    },
    {
      "type": "input_dummy",
      "name": "NAME"
    },
    {
      "type": "field_number",
      "name": "BTIME",
      "value": 10,
      "min": 0
    },
    {
      "type": "input_dummy",
      "name": "M1"
    }
  ],
  "colour": 180
},{
  "type": "cookingrecipe",
  "tooltip": "Defines a cooking recipe",
  "helpUrl": "",
  "message0": "cooking recipe %1 %2 → %3 %4 cooktime: %5 second(s) %6",
  "args0": [
    {
      "type": "input_dummy",
      "name": "NAME"
    },
    {
      "type": "field_input",
      "name": "I",
      "text": `${document.getElementById('id').value}:item1`
    },
    {
      "type": "field_input",
      "name": "O",
      "text": "default:coalblock"
    },
    {
      "type": "input_dummy",
      "name": "M1"
    },
    {
      "type": "field_number",
      "name": "CTIME",
      "value": 5,
      "min": 0
    },
    {
      "type": "input_dummy",
      "name": "M2"
    }
  ],
  "colour": 180
}]);

lua.luaGenerator.forBlock['node'] = function(block) {
    const text_id = block.getFieldValue('ID');
    const text_name = block.getFieldValue('NAME');
    const text_img = block.getFieldValue('IMG');
    const checkbox_isgnd = block.getFieldValue('ISGND');
    const number_hard = block.getFieldValue('HARD');
    const text_did = block.getFieldValue('DID');
    const dropdown_grp = block.getFieldValue('GRP');
    const code = `core.register_node('$((ID:${text_id}', {
    description = "${text_name}",
    tiles = {"${text_img}.png"},
    groups = {${dropdown_grp} = ${number_hard}},
    is_ground_content = ${checkbox_isgnd.toLowerCase()},
    drop = '${text_did}'
})`;
    return code;
}

lua.luaGenerator.forBlock['node2'] = function(block) {
    const text_id = block.getFieldValue('ID');
    const text_name = block.getFieldValue('NAME');
    const text_xp = block.getFieldValue('xp');
    const text_xm = block.getFieldValue('xm');
    const text_yp = block.getFieldValue('yp');
    const text_ym = block.getFieldValue('ym');
    const text_zp = block.getFieldValue('zp');
    const text_zm = block.getFieldValue('zm');
    const checkbox_isgnd = block.getFieldValue('ISGND');
    const text_did = block.getFieldValue('DID');
    const number_hard = block.getFieldValue('HARD');
    const dropdown_grp = block.getFieldValue('GRP');
    const code = `core.register_node('$((ID:${text_id}', {
description = "${text_name}",
tiles = {"${text_yp}.png",    -- y+
        "${text_ym}.png",  -- y-
        "${text_xp}.png", -- x+
        "${text_xm}.png",  -- x-
        "${text_zp}.png",  -- z+
        "${text_zm}.png", -- z-
        },
groups = {${dropdown_grp} = ${number_hard}},
is_ground_content = ${checkbox_isgnd.toLowerCase()},
drop = '${text_did}'
})`;
    return code;
  }

lua.luaGenerator.forBlock['item'] = function(block) {
  const text_id = block.getFieldValue('ID');
  const text_name = block.getFieldValue('NAME');
  const text_img = block.getFieldValue('IMG');

  const code = `core.register_craftitem("$((ID:${text_id}", {
description = "${text_name}",
inventory_image = "${text_img}.png"
})`;
  return code;
}

lua.luaGenerator.forBlock['alias'] = function(block) {
  const text_i = block.getFieldValue('I');
  const text_o = block.getFieldValue('O');
  const code = `core.register_alias("${text_o}", "${text_i}")
`;
  return code;
}

lua.luaGenerator.forBlock['shapedcraft'] = function(block) {
  const text_out = block.getFieldValue('OUT');
  const number_amount = block.getFieldValue('AMOUNT');

  const text_r1a = block.getFieldValue('r1a');
  const text_r1b = block.getFieldValue('r1b');
  const text_r1c = block.getFieldValue('r1c');

  const text_r2a = block.getFieldValue('r2a');
  const text_r2b = block.getFieldValue('r2b');
  const text_r2c = block.getFieldValue('r2c');

  const text_r3a = block.getFieldValue('r3a');
  const text_r3b = block.getFieldValue('r3b');
  const text_r3c = block.getFieldValue('r3c');

  const code = `core.register_craft({
output = "${text_out} ${number_amount}",
recipe = {
    {"${text_r1a}", "${text_r1b}", "${text_r1c}"},
    {"${text_r2a}", "${text_r2b}", "${text_r2c}"},
    {"${text_r3a}", "${text_r3b}", "${text_r3c}"}
}
})`;
  return code;
}

lua.luaGenerator.forBlock['fuel'] = function(block) {
  const text_name = block.getFieldValue('NAME');
  const number_btime = block.getFieldValue('BTIME');
  const code = `core.register_craft({
type = "fuel",
recipe = "${text_name}",
burntime = ${number_btime},
})`;
  return code;
}

lua.luaGenerator.forBlock['cookingrecipe'] = function(block) {
  const text_i = block.getFieldValue('I');
  const text_o = block.getFieldValue('O');

  const number_ctime = block.getFieldValue('CTIME');

  const code = `core.register_craft({
type = "cooking",
output = "${text_o}",
recipe = "${text_i}",
cooktime = ${number_ctime},
})`;
  return code;
}

var toolbox = {
    "kind": "categoryToolbox",
    "contents": [
      {
        "kind": "category",
        "name": "Nodes",
        "categorystyle": "n_category",
        "contents": [
          {
            "kind": "block",
            "type": "node2"
          },
          {
            "kind": "block",
            "type": "node"
          }
        ]
      },
      {
        "kind": "category",
        "name": "Items",
        "categorystyle": "i_category",
        "contents": [
          {
            "kind": "block",
            "type": "item"
          },
        ]
      },
      {
        "kind": "category",
        "name": "Recipes",
        "categorystyle": "r_category",
        "contents": [
          {
            "kind": "block",
            "type": "shapedcraft"
          },
          {
            "kind": "block",
            "type": "cookingrecipe"
          },
          {
            "kind": "block",
            "type": "fuel"
          }
        ]
      }
    ]
};

const theme = Blockly.Theme.defineTheme('dark', {
    base: Blockly.Themes.Classic,
    startHats: false,
    componentStyles: {
      workspaceBackgroundColour: '#1e1e1e',
      toolboxBackgroundColour: 'blackBackground',
      toolboxForegroundColour: '#fff',
      flyoutBackgroundColour: '#252526',
      flyoutForegroundColour: '#ccc',
      flyoutOpacity: 1,
      scrollbarColour: '#797979',
      insertionMarkerColour: '#fff',
      insertionMarkerOpacity: 0.3,
      scrollbarOpacity: 0.4,
      cursorColour: '#d0d0d0',
      blackBackground: '#000',
    },
    categoryStyles: {
      'r_category': {
         'colour': '180'
      },
      'i_category': {
         'colour': '120',
      },
      'n_category': {
         'colour': '225',
      }
   }
});



var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');
var demoWorkspace = Blockly.inject(blocklyDiv, {
    toolbox: toolbox,
    theme: 'dark',
    renderer: 'thrasos',
    move:{
      scrollbars: {
        horizontal: true,
        vertical: true
      },
      drag: true,
      wheel: false}
});

function saveWorkspace() {
    const state = Blockly.serialization.workspaces.save(demoWorkspace);
    localStorage.setItem('dmworkspace-state', JSON.stringify(state));
    localStorage.setItem('b64IMG', JSON.stringify(fs));
}

function loadWorkspace() {
    const state = localStorage.getItem('dmworkspace-state');
    if (state === null) {
        Blockly.serialization.workspaces.load({}, demoWorkspace);
    } else {
        Blockly.serialization.workspaces.load(JSON.parse(state), demoWorkspace);
    }
}

loadWorkspace();

demoWorkspace.addChangeListener(saveWorkspace);

var onresize = function (e) {
// Compute the absolute coordinates and dimensions of blocklyArea.
var element = blocklyArea;
var x = 0;
var y = 0;
do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
} while (element);
// Position blocklyDiv over blocklyArea.
blocklyDiv.style.left = x + 'px';
blocklyDiv.style.top = y + 'px';
blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
Blockly.svgResize(demoWorkspace);

console.log('resize');
};
window.addEventListener('resize', onresize, false);
onresize();
