$(document).ready(function () {
    const homeHeader = $('#home header b');
    const name = prompt('Masukkan nama Anda: ');

    if (name) {
        homeHeader.text('Hi, ' + name);
        $('#inputNama').val(name)
    }

    $('#formMessageUs').submit(function (e) {
        e.preventDefault();

        const data = {
            nama: $('#inputNama').val(),
            email: $('#inputEmail').val(),
            telepon: $('#inputTelepon').val(),
            jenisKelamin: $(this).find('input[name="inputJenisKelamin"]:checked').val(),
            pesan: $('#inputPesan').val()
        };

        renderFormResult($('#formResult'), data);
    });
});

function renderFormResult($resultContainer, { nama, email, telepon, jenisKelamin, pesan }) {
    const resultHtml = `
        <div class="relative flex flex-col my-5 w-full bg-white shadow-sm border border-slate-200 rounded-lg w-96">
            <div class="mx-3 mb-0 border-b border-slate-200 pt-3 pb-2 px-1 text-center">
                <span class="text-sm text-slate-600 font-medium">
                    Data Anda
                </span>
            </div>
  
            <div class="p-4">
                <table>
                    <tbody>
                        <tr><td><span class="font-semibold">Nama</span></td><td>&emsp;:&nbsp;&nbsp;${nama}</td></tr>
                        <tr><td><span class="font-semibold">Email</span></td><td>&emsp;:&nbsp;&nbsp;${email}</td></tr>
                        <tr><td><span class="font-semibold">Telepon</span></td><td>&emsp;:&nbsp;&nbsp;${telepon}</td></tr>
                        <tr><td><span class="font-semibold">Jenis kelamin</span></td><td>&emsp;:&nbsp;&nbsp;${jenisKelamin === 'male' ? 'Laki - laki' : 'Perempuan'}</td></tr>
                        <tr><td><span class="font-semibold">Pesan</span></td><td>&emsp;:&nbsp;&nbsp;${pesan}</td></tr>
                    </tbody>
                </table>
            </div>
        </div>`;

    $resultContainer.html(resultHtml);
}

// Function to validate the form
function validateForm() {
    // Get the input element by its ID
    const nameInput = document.getElementById('name-input');

    if (nameInput.value === '') {
        // If the input is empty, alert the user
        alert('Please enter your name!');
    } else {
        // If the input is valid, display the name in the result form
        document.getElementById('result-form').innerHTML = nameInput.value;
    }
}