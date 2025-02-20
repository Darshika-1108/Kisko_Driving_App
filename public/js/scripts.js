
function fetchAvailableSlots(date) {
    fetch(`/g2/appointments?date=${date}`)
        .then(response => response.json())
        .then(data => {
            const timeSlotsContainer = document.getElementById('timeSlots');
            timeSlotsContainer.innerHTML = '';
            if (data.appointments && data.appointments.length > 0) {
                data.appointments.forEach(appointment => {
                    const slotElement = document.createElement('div');
                    slotElement.className = 'form-check';
                    slotElement.innerHTML = `
                        <input class="form-check-input" type="radio" name="appointmentId" value="${appointment._id}" id="timeSlot_${appointment.time}" />
                        <label class="form-check-label" for="timeSlot_${appointment.time}">
                            ${appointment.time}
                        </label>
                    `;
                    timeSlotsContainer.appendChild(slotElement);
                });
            } else {
                timeSlotsContainer.innerHTML = '<p>No available slots for the selected date.</p>';
            }
        })
        .catch(error => console.error('Error fetching available slots:', error));
}


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('dob').addEventListener('change', () => {
        const dob = new Date(document.getElementById('dob').value);
        const currentDate = new Date();
        let ageValue = currentDate.getFullYear() - dob.getFullYear();
        const monthValue = currentDate.getMonth() - dob.getMonth();

        
        if (monthValue < 0 || (monthValue === 0 && currentDate.getDate() < dob.getDate())) {
            ageValue--;
        }

        if (ageValue < 18) {
            alert("Please enter a valid age because age must be between 18 and 120.");
            document.getElementById('dob').value = "";
            document.getElementById('age').value = "";
        } else {
            document.getElementById('age').value = ageValue;
        }
    });

    // document.getElementById('date').addEventListener('change', function() {
    //     const selectedDate = this.value;
    //     fetch(`/appointments?date=${selectedDate}`)
    //         .then(response => response.json())
    //         .then(data => {
    //             const timeSlotSelect = document.getElementById('timeSlot');
    //             const options = timeSlotSelect.options;
    //             for (let i = 0; i < options.length; i++) {
    //                 const option = options[i];
    //                 if (data.includes(option.value)) {
    //                     option.disabled = true;
    //                     option.textContent += " (Unavailable)";
    //                 } else {
    //                     option.disabled = false;
    //                     option.textContent = option.value;  // Reset to original text
    //                 }
    //             }
    //         })
    //         .catch(error => console.error('Error fetching time slots:', error));
    // });

    document.getElementById('date').addEventListener('change', function() {
        fetchAvailableSlots(this.value);
    });

});







