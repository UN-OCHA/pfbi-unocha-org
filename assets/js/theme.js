// Custom theme code

if ($('.clean-gallery').length > 0) {
   baguetteBox.run('.clean-gallery', { animation: 'slideIn'});
}

if ($('.clean-product').length > 0) {
    $(window).on("load",function() {
        $('.sp-wrap').smoothproducts();
    });
}

var ranges = [
  { divider: 1e18 , suffix: 'E' },
  { divider: 1e15 , suffix: 'P' },
  { divider: 1e12 , suffix: 'T' },
  { divider: 1e9 , suffix: 'G' },
  { divider: 1e6 , suffix: 'M' },
  { divider: 1e3 , suffix: 'k' }
];

function formatNumber(num, digits) {
  var si = [
    { value: 1, symbol: "" },
    { value: 1E3, symbol: "k" },
    { value: 1E6, symbol: "M" },
    { value: 1E9, symbol: "G" },
    { value: 1E12, symbol: "T" },
    { value: 1E15, symbol: "P" },
    { value: 1E18, symbol: "E" }
  ];
  var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

let $donors_ = document.querySelector('#donorsFig');
let $partnersFunded_ = document.querySelector('#partnersFundedFig');
let $projects_ = document.querySelector('#projectsFig');
let $contributions_ = document.querySelector('#contributionFig');
let $allocations_ = document.querySelector('#allocationFig');
let $underApproval_ = document.querySelector('#underApprovalFig');
let $updatedOn_ = document.querySelector('#updatedOn');
let $allocationYear=document.querySelector('.annualHeading__2uJLv');

var yearToShowDataOnLoad = 2019;

fetch('https://cbpfapi.unocha.org/vo2/odata/CBPFSummary?allocationYear='+ yearToShowDataOnLoad)
  .then(response => {
    if (response.ok) {
      response.json().then(data => {
        //$div1_.textContent = JSON.stringify(data);
        var obj = data;
		if($donors_ != null)
        $donors_.textContent = obj.donors;
	
	if($partnersFunded_ != null)
    	$partnersFunded_.textContent = obj.partnersFunded;
	
	if($projects_ != null)
        $projects_.textContent = obj.projectsFunded;
	
	if($contributions_ != null)
        $contributions_.textContent = '$'+ formatNumber(obj.contribTotalAmt);
	
	if($allocations_ != null)
        $allocations_.textContent = '$'+ formatNumber(obj.allocAmt);
	
	if($underApproval_ != null)
        $underApproval_.textContent = '$'+ formatNumber(obj.underApprovalAmt);
      });
    } else console.log('Network response was not ok.');
  })
  .catch(error => {
    console.log('Fetch error: ');
  });

fetch('https://cbpfapi.unocha.org/vo2/odata/LastModified')
  .then(response => {
    if (response.ok) {
      response.json().then(data => {
        //$div1_.textContent = JSON.stringify(data);
        var obj = data;
		if($updatedOn_ != undefined && $updatedOn_ != null)
        $updatedOn_.textContent = ConvertJsonDateTime(obj.value[0].last_updated_date);
      });
    } else console.log('Network response was not ok.');
  })
  .catch(error => {
    console.log('Fetch error: ');
  });

function ConvertJsonDateTime(jsonDate)
	{
		var date = new Date(jsonDate); 
		var month = date.getMonth() + 1; 
		month = month.toString().length > 1 ? month : "0" + month; 
															
		return date.getDate() + "/" + month + "/" + date.getFullYear() + " " + date.getHours() + ":"+ date.getMinutes() + ":" + date.getSeconds();
	}
