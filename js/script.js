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
            nama: $('#inputNama').val().trim(),
            email: $('#inputEmail').val(),
            telepon: $('#inputTelepon').val(),
            jenisKelamin: $(this).find('input[name="inputJenisKelamin"]:checked').val(),
            pesan: escapeHtml($('#inputPesan').val().trim())
        };

        const validate = validateForm(data);
        validate.status ? renderFormResult($('#formResult'), data) : alert(validateMessage(validate.message));
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

function validateMessage({ nama, email, telepon, jenisKelamin, pesan }) {
    let message = "";
    message += nama ? `${nama}\n\n` : '';
    message += email ? `${email}\n\n` : '';
    message += telepon ? `${telepon}\n\n` : '';
    message += jenisKelamin ? `${jenisKelamin}\n\n` : '';
    message += pesan ? `${pesan}` : '';
    return message;
}

// Function to validate the form
function validateForm({ nama, email, telepon, jenisKelamin, pesan }) {
    const rules = {
        nama: { regex: /^[a-zA-Z\s]+$/ },
        email: { regex: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/ },
        telepon: { regex: /^[0-9]{10,13}$/ },
        jenisKelamin: ['male', 'female']
    };

    const result = { status: true, message: {} };

    if (!nama || !rules.nama.regex.test(nama)) {
        result.status = false;
        result.message['nama'] = 'Nama harus diisi dan hanya boleh huruf dan spasi';
    }

    if (!email || !rules.email.regex.test(email)) {
        result.status = false;
        result.message['email'] = 'Email harus diisi dan format email harus sesuai';
    }

    if (!telepon || !rules.telepon.regex.test(telepon)) {
        result.status = false;
        result.message['telepon'] = 'Telepon harus diisi dan hanya boleh angka sebanyak 10-13 digit';
    }

    if (!jenisKelamin || !rules.jenisKelamin.includes(jenisKelamin)) {
        result.status = false;
        result.message['jenisKelamin'] = 'Jenis kelamin harus diisi';
    }

    if (!pesan) {
        result.status = false;
        result.message['pesan'] = 'Pesan harus diisi';
    }

    return result;
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}