// Experiment parameters
const isPavlovia = false;
const exp_code = 'CorrFI';
const exp_name = "CompositeFace";
const prac_criteria = 0.75;
const same_key = '1'; //'1' or '2'
const prolific_link = "'https://app.prolific.co/submissions/complete?cc=55FEFEBB'";

// different key
var respKeys = ['1','2'];
respKeys = respKeys.filter(function(item) {
  return item !== same_key
})
var diff_key = respKeys[0]

// shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return(array)
};

/* main trials */
var stim_group = [
  ['F1002', 'F1015', 'F1046', 'F1059'],
  ['F2016',	'F2017', 'F2032',	'F2067'],
  ['F3047',	'F3062', 'F3079',	'F3112'],
  ['F4018',	'F4020', 'F4040',	'F4064'],
  ['F5033',	'F5068', 'F5076',	'F5078'],
  ['M1119',	'M1122', 'M1125',	'M1186'],
  ['M2141',	'M2142', 'M2198',	'M2201'],
  ['M3013',	'M3153', 'M3183',	'M3187'],
  ['M4134',	'M4136', 'M4188',	'M4197'],
  ['M5146',	'M5152', 'M5154',	'M5178',]
];

// randomize the order of images in each group
for (let i = 0; i < stim_group.length; i++) {
  stim_group[i] = shuffleArray(stim_group[i])
};

// Trial general parameters
const params = {
  // Stimulus durations
  'fix_duration': 500,
  'study_duration': 500,
  'mask_duration': 500,
  'test_duration': 500,
  'ISI': 1000,

  // stimulus parameters
  'stim_ext': '.png', // extension of the images
  'stim_width': 500, // the width of the images
  'stim_height': 307, // the height of the images

  // jitters (the jitter will be [-15, -10, -5, 0, 5, 10, 15])
  'jitter_size': 5,
  'jitter_range': 7, //odd number

  // breaks
  'nTrialPerBreak': 40,
  'minBreakSec': 10*1000 // ms
};

params.mask_list = ['F1002_bscr1.png', 'F1002_bscr2.png', 
                    'F1015_bscr1.png', 'F1015_bscr2.png', 
                    'F1046_bscr1.png', 'F1046_bscr2.png',  
                    'F1059_bscr1.png', 'F1059_bscr2.png', 
                    'F2016_bscr1.png', 'F2016_bscr2.png',
                    'F2017_bscr1.png', 'F2017_bscr2.png',
                    'F2032_bscr1.png', 'F2032_bscr2.png',
                    'F2067_bscr1.png', 'F2067_bscr2.png',
                    'F3047_bscr1.png', 'F3047_bscr2.png',
                    'F3062_bscr1.png', 'F3062_bscr2.png',
                    'F3079_bscr1.png', 'F3079_bscr2.png',
                    'F3112_bscr1.png', 'F3112_bscr2.png',
                    'F4018_bscr1.png', 'F4018_bscr2.png',
                    'F4020_bscr1.png', 'F4020_bscr2.png',
                    'F4040_bscr1.png', 'F4040_bscr2.png',
                    'F4064_bscr1.png', 'F4064_bscr2.png',
                    'F5033_bscr1.png', 'F5033_bscr2.png',
                    'F5068_bscr1.png', 'F5068_bscr2.png',
                    'F5076_bscr1.png', 'F5076_bscr2.png',
                    'F5078_bscr1.png', 'F5078_bscr2.png',
                    'M1119_bscr1.png', 'M1119_bscr2.png',
                    'M1122_bscr1.png', 'M1122_bscr2.png',
                    'M1125_bscr1.png', 'M1125_bscr2.png',
                    'M1186_bscr1.png', 'M1186_bscr2.png',
                    'M2141_bscr1.png', 'M2141_bscr2.png',
                    'M2142_bscr1.png', 'M2142_bscr2.png',
                    'M2198_bscr1.png', 'M2198_bscr2.png',
                    'M2201_bscr1.png', 'M2201_bscr2.png',
                    'M3013_bscr1.png', 'M3013_bscr2.png',
                    'M3153_bscr1.png', 'M3153_bscr2.png',
                    'M3183_bscr1.png', 'M3183_bscr2.png',
                    'M3187_bscr1.png', 'M3187_bscr2.png',
                    'M4134_bscr1.png', 'M4134_bscr2.png',
                    'M4136_bscr1.png', 'M4136_bscr2.png',
                    'M4188_bscr1.png', 'M4188_bscr2.png',
                    'M4197_bscr1.png', 'M4197_bscr2.png',
                    'M5146_bscr1.png', 'M5146_bscr2.png',
                    'M5152_bscr1.png', 'M5152_bscr2.png',
                    'M5154_bscr1.png', 'M5154_bscr2.png',
                    'M5178_bscr1.png', 'M5178_bscr2.png'
                  ];
params.mask_dir = 'stim/main_mask/';
params.group_names = ['F1', 'F2', 'F3', 'F4', 'F5', 'M1', 'M2', 'M3', 'M4', 'M5'];
params.stim_group = stim_group;
params.stim_dir = 'stim/main_stim/';

/* practice */
var params_prac =JSON.parse(JSON.stringify(params));
var stim_group_prac = [['l1', 'l2', 'l3', 'l4']]; // the original filenames
for (let i = 0; i < stim_group_prac.length; i++) {
  stim_group_prac[i] = shuffleArray(stim_group_prac[i])
}
params_prac.mask_list = ['l1_bscr1.png', 'l1_bscr2.png', 'l1_bscr3.png', 'l1_bscr4.png', 
                         'l2_bscr1.png', 'l2_bscr2.png', 'l2_bscr3.png', 'l2_bscr4.png', 
                         'l3_bscr1.png', 'l3_bscr2.png', 'l3_bscr3.png', 'l3_bscr4.png', 
                         'l4_bscr1.png', 'l4_bscr2.png', 'l4_bscr3.png', 'l4_bscr4.png'];
params_prac.mask_dir = 'stim/prac_mask/';
params_prac.group_names = ['Line'];
params_prac.stim_group = stim_group_prac;
params_prac.stim_dir = 'stim/prac_stim/';

// instructions
var instructroll_top = ["<h2> Welcome to this experiment! </h2>",
  "<p><br>In this experiment, two consecutive faces will be displayed.</p>" +
  "<p>Please focus on the top parts of faces and judge whether the top parts are the same.</p>",
  "<p>If the top parts are the <strong>same</strong>, press the key "+same_key+".<br>" +
  "If the top parts are <strong>different</strong>, press the key "+diff_key+".</p>",
  "<p>Please respond as accurately and quickly as you can.</p>"];

var instructroll_cue = ["<h2> Welcome to this experiment! </h2>" +
"<p><br>In this experiment, two consecutive faces will be displayed.</p>",
"<p>Please study the first face carefully, " +
"<br>and then a white bracket (i.e., a cue) will appear either above or below the second face.</p>" +
"<p>You need to judge whether the cued facial half of the second face is the same as the corresponding half of the first face.</p>",
"<p>If the cued halves are the <strong>same</strong>, press the key "+same_key+".<br>" +
"If the cued halves are <strong>different</strong>, press the key "+diff_key+".</p>",
"<p>Please respond as accurately and quickly as you can.</p>"];

var instruct_top = "<h2> Welcome to this experiment! </h2>" +
  "<p><br>In this experiment, two consecutive faces will be displayed.</p>" +
  "<p>Please focus on the top parts of faces and judge whether the top parts are the same.</p>" +
  "<p>If the top parts are the <strong>same</strong>, press the key "+same_key+".<br>" +
  "If the top parts are <strong>different</strong>, press the key "+diff_key+".</p>" +
  "<p>Please respond as accurately and quickly as you can.<p>" +
  "<div style='width: 700px;'>"+
  "<p><br>Press SPACE to start the practice.</p>";

var instruct_cue = "<h2> Welcome to this experiment! </h2>" +
"<p><br>In this experiment, two consecutive faces will be displayed.</p>" +
"<p>Please study the first face carefully, " +
"<br>and then a white bracket (i.e., a cue) will appear either above or below the second face.</p>" +
"<p>You need to judge whether the cued facial half of the second face is the same as the corresponding half of the first face.</p>" +
"<p>If the cued halves are the <strong>same</strong>, press the key "+same_key+".<br>" +
"If the cued halves are <strong>different</strong>, press the key "+diff_key+".</p>" +
"<p>Please respond as accurately and quickly as you can.</p>" +
"<p><br>Press SPACE to start the practice.</p>";

// CF version parameters
const CFversion = 'CCF'; // SCF, CCF, SCF+, CCFnoCue
switch(CFversion) {
  case 'SCF':
    var task = {
      'cfversion': CFversion,
      'trialtype': [1,2,5,6],  // see face_selector
      'is_top_cued': [1],
      'is_study_always_aligned': 0,
      'instructroll': instructroll_top,
      'instruct': instruct_top
    }
    break;
  case 'CCF':
    var task = {
      'cfversion': CFversion,
      'trialtype': [0,1,2,3,4,5,6,7],  // see face_selector
      'is_top_cued': [0, 1],
      'is_study_always_aligned': 1,
      'instructroll': instructroll_cue,
      'instruct': instruct_cue
    }
    break;
  case 'CCFnoCue':
    var task = {
      'cfversion': CFversion,
      'trialtype': [0,1,2,3,4,5,6,7],  // see face_selector
      'is_top_cued': [1],
      'is_study_always_aligned': 1,
      'instructroll': instructroll_top,
      'instruct': instruct_top
    }
    break;
  case 'SCF+':
    var task = {
      'cfversion': CFversion,
      'trialtype': [0,1,2,4,5,6],  // see face_selector
      'is_top_cued': [1],
      'is_study_always_aligned': 0,
      'instructroll': instructroll_top,
      'instruct': instruct_top
    }
    break;
  default:
    // default is SCF
    var task = {
      'cfversion': CFversion,
      'trialtype': [1,2,5,6],  // see face_selector
      'is_top_cued': [1],
      'is_study_always_aligned': 0,
      'instructroll': instructroll_top,
      'instruct': instruct_top
    }
}
