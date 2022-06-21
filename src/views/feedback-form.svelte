<script>
    import BeDialog from "@brewer/beerui/be-dialog";
    import { BeForm, BeFormItem } from "@brewer/beerui/be-form";
    import BeInput from "@brewer/beerui/be-input";
    import BeButton from "@brewer/beerui/be-button";
    import BeTextarea from "@brewer/beerui/be-textarea";
    import { BeSelect, BeOption } from "@brewer/beerui/be-select";

    import { createEventDispatcher } from "svelte";
    import '@brewer/beerui/assets/beer.css'
    export let dialogShow = false;
    const dispatch = createEventDispatcher();

    function beforeClose() {
        dispatch("close");
        resetForm();
    }
    let questionForm = {
        questionType: 1,
        name: "",
        phoneCode: "",
        phoneNumber: "",
        email: "",
        desc: "",
    };
    let rules = {
        questionType: [
            { required: true, message: "请选择问题类型", trigger: "blur" },
        ],
        desc: [
            { required: true, message: "请输入问题描述", trigger: "blur" },
            {
                max: 1000,
                message: "最多1000字",
                trigger: "change",
            },
        ],
    };
    let questionFormDom = null;
    const handleConfirm = () => {
        questionFormDom.validate((valid) => {
            if (valid) {
                alert("submit!");
            } else {
                console.log("error submit!!");
                return false;
            }
        });
    };
    const resetForm = () => {
        questionForm = {
            questionType: 1,
            name: "",
            phoneCode: "",
            phoneNumber: "",
            email: "",
            desc: "",
        };
        setTimeout(() => {
            questionFormDom.resetFields();
        }, 60);
    };
</script>

<BeDialog
    width="80%"
    bind:visible={dialogShow}
    {beforeClose}
    title="提交问题或建议"
>
    <BeForm
        bind:model={questionForm}
        bind:rules
        bind:this={questionFormDom}
        on:submit={handleConfirm}
    >
        <BeFormItem label="问题类型" prop="questionType">
            <BeSelect bind:value={questionForm.questionType} clearable>
                <BeOption label="体验问题" value={1} />
            </BeSelect>
        </BeFormItem>
        <BeFormItem label="姓名" prop="name">
            <BeInput
                bind:value={questionForm.name}
                placeholder={"请输入姓名"}
                clearable={true}
                autocomplete="off"
            />
        </BeFormItem>
        <BeFormItem label="手机" prop="phoneNumber">
            <div class="phone-item">
                <BeSelect
                    bind:value={questionForm.phoneCode}
                    placeholder={"区号"}
                >
                    <BeOption label="体验问题" value={null} />
                    <BeOption label="xxx" value="shanghai" />
                    <BeOption label="区域二" value="beijing" />
                </BeSelect>
                <BeInput
                    bind:value={questionForm.phoneNumber}
                    placeholder={"请输入手机号码"}
                />
            </div>
        </BeFormItem>
        <BeFormItem label="邮箱" prop="email">
            <BeInput
                bind:value={questionForm.email}
                placeholder={"请输入邮箱"}
                autocomplete="off"
            />
        </BeFormItem>
        <BeFormItem label="问题描述" prop="desc">
            <BeTextarea
                bind:value={questionForm.desc}
                style="height: 100px;"
                placeholder={"请输入问题的详细描述，最多1000字"}
            />
        </BeFormItem>
    </BeForm>
    <span slot="footer">
        <div class="be-dialog__footer">
            <span class="be-dialog-footer">
                <BeButton
                    class="confirmBtn"
                    type="primary"
                    on:click={() => handleConfirm("confirm")}>提交</BeButton
                >
            </span>
        </div>
    </span>
</BeDialog>

<style>
    .be-dialog {
        position: relative;
    }
    .be-dialog__title {
        user-select: none;
    }
    .be-dialog__mask {
        background: var(--be-mask-active);
        height: 100%;
        left: 0;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 997;
    }
    .be-dialog__container {
        background: #fff;
        border-radius: 0.2em;
        left: 50%;
        min-width: 32em;
        overflow: auto;
        position: fixed;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 30%;
        z-index: 998;
    }
    .be-dialog__header {
        padding: 20px 20px 10px;
    }
    .be-dialog__header.drag {
        cursor: move;
    }
    .be-dialog__close {
        background: transparent;
        border: none;
        color: #8b8b8b;
        cursor: pointer;
        font: 700 22px/14px Tahoma, Verdana, sans-serif;
        outline: none;
        padding: 0;
        position: absolute;
        right: 20px;
        top: 20px;
        user-select: none;
    }
    .be-dialog__close:hover {
        color: #747373;
    }
    .be-dialog__body {
        color: #606266;
        font-size: 14px;
        padding: 30px 20px;
        word-break: break-all;
    }
    .be-dialog__footer {
        box-sizing: border-box;
        padding: 10px 20px 20px;
        text-align: right;
    }
    :global(.confirmBtn) {
        background: #1863fb;
        border-radius: 2px;
        border: none;
    }
    :global(.be-dialog__header) {
        text-align: center;
        border-bottom: 1px solid #e9e9e9;
    }
    :global(.be-dialog__close) {
        font-weight: 400;
    }
    :global(.be-dialog__title) {
        text-align: center;
    }

    :global(.be-input, .be-input input) {
        cursor: auto;
    }
    :global(.be-select .be-input input) {
        cursor: pointer;
    }
    :global(.be-input__inner) {
        height: 32px;
        line-height: 32px;
        background: #ffffff;
        border: 1px solid #dcdfe6;
        border-radius: 2px;
    }
    :global(.be-textarea textarea:focus, .be-input__inner:focus) {
        border-color: #1863fb;
        outline: none;
    }
    :global(.be-dialog__body) {
        display: flex;
        justify-content: center;
    }
    :global(.be-form) {
        width: 100%;
        max-width: 550px;
    }
    :global(.phone-item) {
        display: flex;
    }
    :global(.be-form-item.is-error .be-textarea__inner) {
        border-color: #f56c6c;
    }
</style>
