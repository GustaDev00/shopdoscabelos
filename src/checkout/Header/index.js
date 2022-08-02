import "./index.scss";

export const Header = () => {
    const fatherDays2022OpenTextField = ()=>{
        const isUserParticipant = localStorage.getItem('@mrcat:diadospais2022');
        if(isUserParticipant){
            vtexjs.checkout
            .getOrderForm()
            .then(function() {
                var obs = "DIA-DOS-PAIS-2022"
                return vtexjs.checkout.sendAttachment("openTextField", { value: obs })
            })
            .done(function(orderForm) {
                console.log("openTextField filled with: ", orderForm.openTextField)
            })
        }
    }


    fatherDays2022OpenTextField();
};
