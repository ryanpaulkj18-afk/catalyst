'use strict';
const examples = {
  hvac: [
    {kicker:'Enquiry received',title:'“The heating isn’t working.”',body:'A homeowner calls while the team is out on a job. The proposed workflow captures the enquiry instead of relying on a voicemail callback.',details:[['Request','Heating repair'],['Source','Inbound call']]},
    {kicker:'Details captured',title:'The right details. Before the visit.',body:'Collect the address, service area and issue using your approved questions. Flag urgent or unclear situations for a person, not an automated diagnosis.',details:[['Check','Service area'],['Handoff','Urgent issues to your team']]},
    {kicker:'Visit arranged',title:'Book around your real availability.',body:'Offer an approved service window, subject to your scheduling setup. Send the customer a confirmation and put the enquiry details in front of your team.',details:[['Appointment','Service visit'],['Status','Customer confirmation']]},
    {kicker:'Follow-up',title:'Keep open estimates moving.',body:'For a replacement or installation quote, follow up on the agreed schedule. Replies, questions and booking changes go back to your team.',details:[['Next step','Estimate follow-up'],['Owner','Your team']]}
  ],
  roofing: [
    {kicker:'Enquiry received',title:'“Can someone look at this leak?”',body:'A homeowner asks about a roof problem. The proposed workflow captures a request for an inspection, without promising a repair price or diagnosis.',details:[['Request','Roof inspection'],['Source','Inbound enquiry']]},
    {kicker:'Details captured',title:'Know what you’re going out to see.',body:'Collect the property address, service area and the issue using your approved questions. Access details or photos can be requested where your process supports them.',details:[['Check','Property and service area'],['Visit','Inspection or estimate']]},
    {kicker:'Visit arranged',title:'An inspection. Not a mystery appointment.',body:'Offer an approved inspection slot, subject to your scheduling setup. Confirm the visit with the homeowner and pass the details to your estimator.',details:[['Appointment','Roof inspection'],['Handoff','Your estimator']]},
    {kicker:'Follow-up',title:'Don’t leave the quote in limbo.',body:'Follow up after an estimate on your agreed schedule. Route questions about scope, materials or pricing to your team, and track the next decision.',details:[['Next step','Quote follow-up'],['Owner','Your team']]}
  ]
};
document.querySelectorAll('[data-walkthrough]').forEach(function(demo){
  const steps=examples[demo.dataset.walkthrough];
  const buttons=Array.from(demo.querySelectorAll('[data-step]'));
  const panel=demo.querySelector('.demo-panel');
  function show(index){
    const step=steps[index];
    buttons.forEach(function(button,i){button.setAttribute('aria-pressed',String(i===index));});
    panel.querySelector('.demo-kicker').textContent=step.kicker;
    panel.querySelector('h2').textContent=step.title;
    panel.querySelector('p[data-body]').textContent=step.body;
    panel.querySelectorAll('.demo-details div').forEach(function(row,i){
      row.querySelector('small').textContent=step.details[i][0];
      row.querySelector('strong').textContent=step.details[i][1];
    });
  }
  buttons.forEach(function(button,index){button.addEventListener('click',function(){show(index);});});
});
