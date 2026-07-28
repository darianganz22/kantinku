/* =====================================================
   KANTINKU SUCCESS PAGE
===================================================== */


/* =====================================================
   LOAD ORDER
===================================================== */

const order =
    JSON.parse(
        localStorage.getItem(
            "kantinku_last_order"
        )
    );


/* =====================================================
   ELEMENTS
===================================================== */

const orderId =
    document.getElementById(
        "orderId"
    );

const customerName =
    document.getElementById(
        "customerName"
    );

const customerClass =
    document.getElementById(
        "customerClass"
    );

const customerNumber =
    document.getElementById(
        "customerNumber"
    );

const pickupMethod =
    document.getElementById(
        "pickupMethod"
    );

const orderNote =
    document.getElementById(
        "orderNote"
    );

const orderItems =
    document.getElementById(
        "orderItems"
    );

const itemCount =
    document.getElementById(
        "itemCount"
    );

const subtotal =
    document.getElementById(
        "subtotal"
    );

const deliveryFee =
    document.getElementById(
        "deliveryFee"
    );

const totalPrice =
    document.getElementById(
        "totalPrice"
    );

const paymentMethod =
    document.getElementById(
        "paymentMethod"
    );

const paymentLogo =
    document.getElementById(
        "paymentLogo"
    );

const paymentStatus =
    document.getElementById(
        "paymentStatus"
    );

const pickupCode =
    document.getElementById(
        "pickupCode"
    );

const timeCreated =
    document.getElementById(
        "timeCreated"
    );


/* =====================================================
   FORMAT RUPIAH
===================================================== */

function formatRupiah(
    value
) {

    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }
    ).format(value);

}


/* =====================================================
   NO ORDER
===================================================== */

if (!order) {

    orderId.textContent =
        "Tidak ditemukan";

    document
        .querySelector(
            ".success-hero > p"
        )
        .textContent =
        "Data pesanan tidak ditemukan. Silakan kembali ke menu utama.";

} else {

    renderOrder();

}


/* =====================================================
   RENDER ORDER
===================================================== */

function renderOrder() {

    /* ORDER ID */

    orderId.textContent =
        order.id;


    /* CUSTOMER */

    customerName.textContent =
        order.student.name;


    customerClass.textContent =
        order.student.className;


    customerNumber.textContent =
        order.student.number;


    pickupMethod.textContent =
        order.pickup;


    /* NOTE */

    if (
        order.note &&
        order.note.trim()
    ) {

        orderNote.textContent =
            order.note;

    } else {

        orderNote.textContent =
            "Tidak ada catatan.";

    }


    /* ITEM COUNT */

    const totalItems =
        order.items.reduce(
            (
                total,
                item
            ) =>
                total +
                item.quantity,
            0
        );


    itemCount.textContent =
        `${totalItems} item`;


    /* ITEMS */

    orderItems.innerHTML =
        order.items
            .map(
                item => {

                    return `

                        <div class="order-item">

                            <img
                                src="${item.image}"
                                alt="${item.name}"
                            >


                            <div class="order-item-info">

                                <h3>
                                    ${item.name}
                                </h3>

                                <small>
                                    ${formatRupiah(item.price)}
                                </small>

                                <span class="quantity">
                                    ${item.quantity} ×
                                </span>

                            </div>


                            <strong class="order-item-price">

                                ${formatRupiah(
                                    item.price *
                                    item.quantity
                                )}

                            </strong>

                        </div>

                    `;

                }
            )
            .join("");


    /* PRICE */

    subtotal.textContent =
        formatRupiah(
            order.subtotal
        );


    deliveryFee.textContent =
        order.deliveryFee > 0
            ? formatRupiah(
                order.deliveryFee
            )
            : "Gratis";


    totalPrice.textContent =
        formatRupiah(
            order.total
        );


    /* PAYMENT */

    paymentMethod.textContent =
        order.payment;


    paymentLogo.textContent =
        getPaymentShortName(
            order.payment
        );


    /* PICKUP CODE */

    pickupCode.textContent =
        createPickupCode(
            order.id
        );


    /* TIME */

    timeCreated.textContent =
        formatTime(
            order.createdAt
        );


    /* PAYMENT STATUS */

    paymentStatus.textContent =
        order.status;

}


/* =====================================================
   PAYMENT SHORT NAME
===================================================== */

function getPaymentShortName(
    payment
) {

    const names = {

        "GoPay":
            "G",

        "DANA":
            "D",

        "OVO":
            "O",

        "ShopeePay":
            "S",

        "QRIS":
            "QR",

        "BCA Virtual Account":
            "BCA",

        "BRI Virtual Account":
            "BRI",

        "BNI Virtual Account":
            "BNI",

        "Mandiri Virtual Account":
            "M"

    };


    return (
        names[payment] ||
        "PAY"
    );

}


/* =====================================================
   PICKUP CODE
===================================================== */

function createPickupCode(
    id
) {

    const cleanId =
        id
            .replace(
                /[^0-9]/g,
                ""
            );


    return (
        "KK" +
        cleanId.slice(-4)
    );

}


/* =====================================================
   TIME
===================================================== */

function formatTime(
    dateString
) {

    if (!dateString) {

        return "Baru saja";

    }


    const date =
        new Date(
            dateString
        );


    return date.toLocaleTimeString(
        "id-ID",
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );

}


/* =====================================================
   COPY ORDER ID
===================================================== */

document
    .getElementById(
        "copyOrderId"
    )
    .addEventListener(
        "click",
        async () => {

            if (!order) {

                return;

            }


            try {

                await navigator.clipboard.writeText(
                    order.id
                );


                const button =
                    document.getElementById(
                        "copyOrderId"
                    );


                button.textContent =
                    "✓ Tersalin";


                setTimeout(
                    () => {

                        button.textContent =
                            "⧉ Salin";

                    },
                    1800
                );


            } catch (error) {

                alert(
                    "Nomor pesanan: " +
                    order.id
                );

            }

        }
    );


/* =====================================================
   PAYMENT INSTRUCTION
===================================================== */

const paymentAction =
    document.getElementById(
        "paymentAction"
    );


paymentAction.addEventListener(
    "click",
    () => {

        if (!order) {

            return;

        }


        openPaymentModal(
            order.payment
        );

    }
);


/* =====================================================
   PAYMENT MODAL
===================================================== */

function openPaymentModal(
    method
) {

    const modal =
        document.getElementById(
            "paymentModal"
        );


    const title =
        document.getElementById(
            "modalPaymentTitle"
        );


    const description =
        document.getElementById(
            "modalPaymentDescription"
        );


    const steps =
        document.getElementById(
            "paymentSteps"
        );


    title.textContent =
        method;


    const instructions =
        getPaymentInstructions(
            method
        );


    description.textContent =
        instructions.description;


    steps.innerHTML =
        instructions.steps
            .map(
                (
                    step,
                    index
                ) => {

                    return `

                        <div class="payment-step">

                            <span class="payment-step-number">
                                ${index + 1}
                            </span>

                            <div>

                                <strong>
                                    ${step.title}
                                </strong>

                                <p>
                                    ${step.description}
                                </p>

                            </div>

                        </div>

                    `;

                }
            )
            .join("");


    modal.classList.add(
        "active"
    );

}


/* =====================================================
   PAYMENT INSTRUCTIONS
===================================================== */

function getPaymentInstructions(
    method
) {

    const instructions = {

        "GoPay": {

            description:
                "Pembayaran GoPay akan diarahkan melalui aplikasi pembayaran.",

            steps: [

                {
                    title:
                        "Buka aplikasi GoPay",

                    description:
                        "Pastikan saldo GoPay kamu mencukupi."
                },

                {
                    title:
                        "Konfirmasi pembayaran",

                    description:
                        "Periksa nominal pembayaran sebelum mengonfirmasi."
                },

                {
                    title:
                        "Selesai",

                    description:
                        "Tunggu status pembayaran terverifikasi."
                }

            ]

        },


        "DANA": {

            description:
                "Gunakan aplikasi DANA untuk menyelesaikan pembayaran.",

            steps: [

                {
                    title:
                        "Buka DANA",

                    description:
                        "Pastikan saldo DANA mencukupi."
                },

                {
                    title:
                        "Konfirmasi nominal",

                    description:
                        "Pastikan nominal pembayaran sesuai."
                },

                {
                    title:
                        "Selesaikan pembayaran",

                    description:
                        "Tunggu pembayaran berhasil diverifikasi."
                }

            ]

        },


        "OVO": {

            description:
                "Pembayaran akan dilakukan menggunakan saldo OVO.",

            steps: [

                {
                    title:
                        "Buka aplikasi OVO",

                    description:
                        "Login dan pastikan saldo tersedia."
                },

                {
                    title:
                        "Konfirmasi pembayaran",

                    description:
                        "Periksa detail transaksi."
                },

                {
                    title:
                        "Selesai",

                    description:
                        "Sistem akan memperbarui status pembayaran."
                }

            ]

        },


        "ShopeePay": {

            description:
                "Gunakan ShopeePay untuk menyelesaikan pembayaran.",

            steps: [

                {
                    title:
                        "Buka Shopee",

                    description:
                        "Masuk ke bagian ShopeePay."
                },

                {
                    title:
                        "Lakukan pembayaran",

                    description:
                        "Ikuti instruksi pembayaran yang tersedia."
                },

                {
                    title:
                        "Selesai",

                    description:
                        "Tunggu sistem memverifikasi pembayaran."
                }

            ]

        },


        "QRIS": {

            description:
                "Scan QRIS menggunakan aplikasi pembayaran yang mendukung QRIS.",

            steps: [

                {
                    title:
                        "Buka aplikasi pembayaran",

                    description:
                        "Gunakan aplikasi bank atau e-wallet yang mendukung QRIS."
                },

                {
                    title:
                        "Scan QRIS",

                    description:
                        "Arahkan kamera ke kode QR pembayaran."
                },

                {
                    title:
                        "Konfirmasi",

                    description:
                        "Periksa nominal lalu konfirmasi pembayaran."
                }

            ]

        },


        "BCA Virtual Account": {

            description:
                "Pembayaran dilakukan melalui Virtual Account BCA.",

            steps: [

                {
                    title:
                        "Buka BCA Mobile",

                    description:
                        "Pilih menu m-Transfer."
                },

                {
                    title:
                        "Pilih BCA Virtual Account",

                    description:
                        "Masukkan nomor Virtual Account dari sistem pembayaran."
                },

                {
                    title:
                        "Konfirmasi",

                    description:
                        "Pastikan nama dan nominal sudah sesuai."
                }

            ]

        },


        "BRI Virtual Account": {

            description:
                "Pembayaran dilakukan melalui Virtual Account BRI.",

            steps: [

                {
                    title:
                        "Buka BRImo",

                    description:
                        "Masuk ke menu pembayaran atau transfer."
                },

                {
                    title:
                        "Masukkan Virtual Account",

                    description:
                        "Gunakan nomor VA yang diberikan sistem."
                },

                {
                    title:
                        "Konfirmasi",

                    description:
                        "Periksa detail pembayaran lalu lanjutkan."
                }

            ]

        },


        "BNI Virtual Account": {

            description:
                "Pembayaran dilakukan melalui Virtual Account BNI.",

            steps: [

                {
                    title:
                        "Buka BNI Mobile",

                    description:
                        "Masuk ke menu pembayaran."
                },

                {
                    title:
                        "Masukkan nomor VA",

                    description:
                        "Gunakan nomor Virtual Account yang diberikan."
                },

                {
                    title:
                        "Konfirmasi",

                    description:
                        "Periksa nominal dan nama penerima."
                }

            ]

        },


        "Mandiri Virtual Account": {

            description:
                "Pembayaran dilakukan melalui Virtual Account Mandiri.",

            steps: [

                {
                    title:
                        "Buka Livin' by Mandiri",

                    description:
                        "Masuk ke menu pembayaran."
                },

                {
                    title:
                        "Masukkan Virtual Account",

                    description:
                        "Gunakan nomor VA yang diberikan sistem."
                },

                {
                    title:
                        "Konfirmasi",

                    description:
                        "Pastikan semua informasi sudah benar."
                }

            ]

        }

    };


    return (
        instructions[method] ||
        instructions["QRIS"]
    );

}


/* =====================================================
   CLOSE PAYMENT MODAL
===================================================== */

function closePaymentModal() {

    document
        .getElementById(
            "paymentModal"
        )
        .classList.remove(
            "active"
        );

}


/* =====================================================
   SUPPORT
===================================================== */

function openSupport() {

    document
        .getElementById(
            "supportModal"
        )
        .classList.add(
            "active"
        );

}


function closeSupport() {

    document
        .getElementById(
            "supportModal"
        )
        .classList.remove(
            "active"
        );

}


/* =====================================================
   CLOSE MODAL BY BACKDROP
===================================================== */

document
    .getElementById(
        "supportModal"
    )
    .addEventListener(
        "click",
        event => {

            if (
                event.target.id ===
                "supportModal"
            ) {

                closeSupport();

            }

        }
    );


document
    .getElementById(
        "paymentModal"
    )
    .addEventListener(
        "click",
        event => {

            if (
                event.target.id ===
                "paymentModal"
            ) {

                closePaymentModal();

            }

        }
    );


/* =====================================================
   PRINT
===================================================== */

function printOrder() {

    window.print();

}