$(document).ready(function()
{

      const weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

      $('#datePicker').datepicker({ //initiate JQueryUI datepicker
        dateFormat: "dd/mm/yy",
        firstDay: 1, //first day is Monday
        beforeShowDay: function(date) {
          //only allow Mondays to be selected
          return [date.getDay() == 1,""];
        },
        onSelect: populateDates
      });

      function populateDates() {
        
        // $('#tBody').empty(); //clear table
         $('.bottom').removeClass('d-none'); //display total hours worked
        let chosenDate = $('#datePicker').datepicker('getDate'); //get chosen date from datepicker
        let newDate;
        const monStartWeekDays = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
        for(let i = 0; i < weekDays.length; i++) { //iterate through each weekday
          newDate = new Date(chosenDate); //create date object
          newDate.setDate(chosenDate.getDate() + i); //increment set date
          //append results to table
          $('#tBody').append( `
          <tr>
            <td class="day">${weekDays[newDate.getDay()].slice(0,10)}</td>
            <td class="start-time"><input id="startTime${monStartWeekDays[i]}" class="time ui-timepicker-input" type="text" /></td>
            <td class="finish-time"><input id="finishTime${monStartWeekDays[i]}" class="time ui-timepicker-input" type="text" /></td></td>
            <td class="break">
              <select id="break${monStartWeekDays[i]}">
                <option value="0">0</option>
                <option value="0.5">0.5</option>
                <option value="1">1</option>
                option value="1.5">1.5</option>
                <option value="2">2</option>
                <option value="2.5">2.5</option>
                <option value="3">3</option>
                <option value="3.5">3.5</option>
                <option value="4">4</option>
                option value="4.5">4.5</option>
                <option value="5">5</option>
                <option value="5.5">5.5</option>
                <option value="6">6</option>
              </select>
            </td>
            <td class="hours-worked" id="hoursWorked${monStartWeekDays[i]}">
              0
            </td>
          </tr>
          ` );

          //function to calculate hours worked
          let calculateHours = () => {
            let startVal = $(`#startTime${monStartWeekDays[i]}`).val();
            let finishVal = $(`#finishTime${monStartWeekDays[i]}`).val();
            let startTime = new Date( `01/01/2022 ${startVal}` );
            let finishTime = new Date( `01/01/2022 ${finishVal}` );
            let breakTime = $(`#break${monStartWeekDays[i]}`).val();
            let hoursWorked = (finishTime.getTime() - startTime.getTime()) / 1000;
            hoursWorked /= (60 * 60);
            hoursWorked -= breakTime;

            if (startVal && finishVal) { //providing both start and finish times are set
              if (hoursWorked >= 0) { //if normal day shift
                $(`#hoursWorked${monStartWeekDays[i]}`).html(hoursWorked);
              } else { //if night shift
                $(`#hoursWorked${monStartWeekDays[i]}`).html(24 + hoursWorked);
              }
            }

            updateTotal();
          }
          //initiate function whenever an input value is changed
          $(`#startTime${monStartWeekDays[i]}, #finishTime${monStartWeekDays[i]}, #break${monStartWeekDays[i]}`).on('change', calculateHours);

        }
        $('.start-time input').timepicker({ 'timeFormat': 'h:i A', 'step': 15, 'scrollDefault': '09:00' });
        $('.finish-time input').timepicker({ 'timeFormat': 'h:i A', 'step': 15, 'scrollDefault': '01:00' });
        
        function updateTotal() { //function to update the total hours worked
          let totalHoursWorked = 0;
          let hrs = document.querySelectorAll('.hours-worked');
          hrs.forEach(function(val) {
            totalHoursWorked += Number(val.innerHTML);
          });
          document.querySelector('#totalHours').innerHTML = totalHoursWorked;
        }
        

      }
      

    });
