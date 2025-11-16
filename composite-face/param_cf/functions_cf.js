// functions for composite face task:

// generate condition information based on ed
function cf_face_selector(ed, params){
  // face selectors (used with experiment design)
  var face_selectors = [
    [0, 1, 0, 1],  // TCS (scf+)
    [0, 1, 2, 3],  // TCD (scf)
    [0, 1, 0, 2],  // TIS (scf)
    [0, 1, 3, 1],  // TID
    [0, 1, 0, 1],  // BCS (scf+)
    [0, 1, 2, 3],  // BCD (scf)
    [0, 1, 3, 1],  // BIS (scf)
    [0, 1, 0, 2]]; // BID
    // Usage:
    // trail_type = 4*(1-isTopCued) + 2*(1-isCongruent) + (1-isCuedSame);
    // thisFaceSet = faceSelector[trail_type].map(function(item){
    //   return (faceIndex + item) % 4
    // })

  // condition information to be saved
  const Cue = ['bot', 'top'];
  const Congruency = ['incongruent', 'congruent'];
  const Alignment = ['misaligned', 'aligned'];
  const SameDifferent = ['different', 'same'];

  // generate the faces used for each trial
  ed.map(function(item) {
    item.trial_type = 4*(1-item.is_top_cued) + 2*(1-item.is_congruent) + (1-item.is_cued_same);
    // whether it is for the current task
    item.isthistask = task.trialtype.includes(item.trial_type)
    var face_index = item.face_index;

    item.face_set = face_selectors[item.trial_type].map(function(item){
      return (face_index + item) % 4
    });

    // whether study face is always aligned
    if (task.is_study_always_aligned){
      var study_ali = '_ali'; //
    } else {
      var study_ali = '_'+Alignment[item.is_aligned].substring(0, 3);
    }

    // whether show cue for study face
    if (task.cfversion=='CCF'){
      var test_cue = '_'+Cue[item.is_top_cued];
    } else {
      var test_cue = '';
    }

    // face stimuli used for each trial

    var this_group_stim = params.stim_group[item.face_group];
    console.log("=== DEBUG ===");
    console.log("item.face_group =", item.face_group);
    console.log("params.stim_group =", params.stim_group);
    console.log("this_group_stim =", this_group_stim);
    console.log("item.face_set =", item.face_set);

    var study_face = this_group_stim[item.face_set[0]]+'_'+this_group_stim[item.face_set[1]]+study_ali+params.stim_ext; // '_'+Cue[item.is_top_cued]+
    var test_face = this_group_stim[item.face_set[2]]+'_'+this_group_stim[item.face_set[3]]+'_'+Alignment[item.is_aligned].substring(0, 3)+test_cue+params.stim_ext;
    item.study_face = params.stim_dir+params.group_names[item.face_group]+'/'+study_face;
    item.test_face = params.stim_dir+params.group_names[item.face_group]+'/'+test_face;

    // Generate random jitters for test faces
    item.test_x_offset = (Math.floor(Math.random() * params.jitter_range) -(params.jitter_range-1)/2) * params.jitter_size;
    item.test_y_offset = (Math.floor(Math.random() * params.jitter_range) -(params.jitter_range-1)/2) * params.jitter_size;

    // data to be saved in the final output
    if(item.trial_type % 2) {
      var answer = diff_key; // different
    } else {
      var answer = same_key; // same
    }

    item.data = {
      Subject: undefined,
      Exp_code: undefined,
      Exp_name: undefined,
      isPavlovia: undefined,
      Trial_num: undefined,
      trial_frame: 'test_face',
      Cue: Cue[item.is_top_cued],
      Congruency: Congruency[item.is_congruent],
      Alignment: Alignment[item.is_aligned],
      SameDifferent: SameDifferent[item.is_cued_same],
      StimGroup: params.group_names[item.face_group],
      StudyFace: study_face,
      TestFace: test_face,
      Correct_response: answer
    }
  });

  // only keep trials for the current task
  ed = ed.filter(ed => ed.isthistask == 1)

  // randomize the mask faces
  var mask_list =[];
  for (i = 0; i<Math.ceil(ed.length / params.mask_list.length);i++) {
    var thismask = shuffleArray(params.mask_list);
    mask_list = mask_list.concat(thismask);
  }

  // add trial numbers
  for (i = 0; i<ed.length;i++) {
    ed[i].data.Trial_num = i+1;
    ed[i].mask_face = params.mask_dir+mask_list[i];
    ed[i].data.MaskFace = mask_list[i];
  }

  // Obtain the full list of stimuli to be used
  var stim_list = ed.flatMap(x => [x["study_face"], x["test_face"], x["mask_face"]]);
  // only keep unique stimuli
  stim_list = stim_list.filter(function(item, pos){
    return stim_list.indexOf(item) == pos;
  });

  // output
  return [ed, stim_list];
}
