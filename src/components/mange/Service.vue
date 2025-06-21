<template>
    <div>
        <el-row class='row-bg' justify='center'>
            <el-text>
                <h2 style="color: #adff2f">服务管理</h2>
            </el-text>
        </el-row>
    </div>

    <div>
        <el-row class='row-bg' justify='end'>
            <el-col :span='2'>
                <el-button type='success' plain @click='addcustomer'>添加服务</el-button>
            </el-col>
        </el-row>
    </div>

    <!-- table -->
    <div>
        <!-- <el-row class="row-bg" justify="center">
            <el-text>
                <h2 style="color: #adff2f">技师列表</h2>
            </el-text>
        </el-row> -->
        <el-row class="row-bg" justify="center" style="margin-top: 30px;">
            <el-col :span="24">
                <el-table :data="tabledata" style="width: 100%" align="center">
                    <el-table-column prop="id" label="ID" width="300" align="center">
                        <template v-slot="{ row }">
                            <el-tag type="success">{{ row.uuid }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="服务名称" width="150" show-overflow-tooltip align="center">
                        <template v-slot="{ row }">
                            <el-tag type="warning">{{ row.name_display }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="price" label="价格" align="center">
                        <template v-slot="{ row }">
                            <el-tag type="danger">{{ row.price }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="description" label="服务简介" align="center">
                        <template v-slot="{ row }">
                            <el-tag type="success">{{ row.description }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="lasttime" label="服务时长" align="center">
                        <template v-slot="{ row }">
                            <el-tag type="success">{{ row.lasttime }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="max" label="最大预约数量" align="center">
                        <template v-slot="{ row }">
                            <el-tag type="success">{{ row.max_appointment }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="max" label="候补预约数量" align="center">
                        <template v-slot="{ row }">
                            <el-tag type="success">{{ row.waiting_appointment }}</el-tag>
                        </template>
                    </el-table-column>
                    <!-- 更新按钮 -->
                    <el-table-column fixed="right" label="更新" width="100" align="center">
                        <template v-slot="{ row }">
                            <el-button type="primary" plain @click="handleupdate(row)">
                                编辑服务
                            </el-button>
                        </template>
                    </el-table-column>
                    <!-- 删除按钮 -->
                    <el-table-column fixed="right" label="操作" width="100" align="center">
                        <template v-slot="{ row }">
                            <el-button type="danger" plain @click="handerdelete(row.uuid)">
                                删除服务
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
    <div>

    </div>





    <!-- 添加服务的dialog -->
    <div>
        <el-dialog v-model="showme1" title="添加服务" width="500" :before-close="handleClose">  
            <div>
                <el-text class='mx-1' type='success' size='large'>
                    添加服务
                </el-text>
            </div>
            <el-form :label-position="labelPosition" label-width="auto" :model="service"
                style="max-width: 600px; margin-top: 23px;">
                <el-form-item label="姓名" prop="name" class="itemxxx">
                    <!-- <el-input v-model="customerdetail.name"></el-input> -->
                    <el-select v-model="service.name" placeholder="Select" size="large" style="width: 240px">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="价格" prop="price" class="itemxxx">
                    <el-input v-model="service.price"></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="description" class="itemxxx">
                    <el-input v-model="service.description"></el-input>
                </el-form-item>
                <el-form-item label="最大预约人数" prop="max_appointment" class="itemxxx">
                    <el-input v-model="service.max_appointment"></el-input>
                </el-form-item>
                <el-form-item label="候补预约人数" prop="waiting_appointment" class="itemxxx">
                    <el-input v-model="service.waiting_appointment"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="handleCancel">Cancel</el-button>
                    <el-button type="primary" @click="handleConfirm">
                        Confirm
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>

    <!-- 更新服务的dialog -->

    <div>
        <el-dialog v-model="showme2" title="添加技师" width="500" :before-close="handleClose2">
            <div>
                <el-text class='mx-1' type='success' size='large'>
                    更新服务
                </el-text>
            </div>
            <el-form :label-position="labelPosition" label-width="auto" :model="updatacustomer"
                style="max-width: 600px; margin-top: 23px;">
                <el-form-item label="姓名" prop="name" class="itemxxx">
                    <!-- <el-input v-model="customerdetail.name"></el-input> -->
                    <el-select v-model="service.name" placeholder="Select" size="large" style="width: 240px">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-form-item>
                <el-form-item label="价格" prop="price" class="itemxxx">
                    <el-input v-model="service.price"></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="description" class="itemxxx">
                    <el-input v-model="service.description"></el-input>
                </el-form-item>
                <el-form-item label="最大预约人数" prop="max_appointment" class="itemxxx">
                    <el-input v-model="service.max_appointment"></el-input>
                </el-form-item>
                <el-form-item label="候补预约人数" prop="waiting_appointment" class="itemxxx">
                    <el-input v-model="service.waiting_appointment"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="handleCancel2">取消</el-button>
                    <el-button type="primary" @click="handleConfirm2">
                        更新
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>

</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import myfetch from '@/utils/myfetch'
import { ElMessage } from 'element-plus'

const service = ref({
    // lasttime:"60"
})
const options = [
    {
        value: '1',
        label: '理发'
    },
    {
        value: '2',
        label: '染发'
    },
    {
        value: '3',
        label: '洗发'
    },
    {
        value: '4',
        label: '护理发'
    },
    {
        value: '5',
        label: '护理加理发'
    },
    {
        value: '6',
        label: '染发加理发'
    }

]

const showme2 = ref(false)
const tabledata = ref([])
const updatacustomer = ref({})

const labelPosition = ref('left')
const customerdetail = ref({
    name: '',
    phone: '',
    address: '',
    password: '',
    email: ''
})


const showme1 = ref(false)

const handleClose = () => {
    showme1.value = false
}

const handleCancel = () => {
    showme1.value = false
}




const addcustomer = () => {
    console.log('addcustomer')
    showme1.value = true
}

const getallcunstomer = async () => {


    try {
        const res = await myfetch.get("service/")
        console.log(res.data)
        tabledata.value = res.data
    } catch (error) {
        console.log(error)
    }
    console.log('getallcunstomer')
}

const handleConfirm = async () => {
    console.log(service.value)
    try {
        const res = await myfetch.post("service/", service.value)
        console.log(res)
        ElMessage.success('添加成功')
        showme1.value = false
        // 清空service.value
        service.value = {}
        await getallcunstomer()
    } catch (error) {
        console.log(error)
        ElMessage.error('添加失败')
        showme1.value = false
    }
}


onMounted(async () => {
    await getallcunstomer()
})





// todo 更新
const handleupdate = (row) => {
    console.log(row)
    updatacustomer.value = row
    showme2.value = true
}

// todo 删除
const handerdelete = async (id) => {
    console.log(id)
    try {
        const res = await myfetch.delete(`service/${id}/`)
        console.log(res.data)
        ElMessage.success('删除成功')
        await getallcunstomer()

    } catch (error) {
        console.log(error)
        ElMessage.error('删除失败')

    }
}


// todo 更新逻辑
const handleCancel2 = () => {
    showme2.value = false
}

const handleClose2 = () => {
    showme2.value = false
}

const handleConfirm2 = async () => {
    console.log(updatacustomer.value)

    try {
        const res = await myfetch.put(`service/${updatacustomer.value.uuid}/`, updatacustomer.value)
        console.log(res.data)
        if (res.data) {
            showme2.value = false
        }
        ElMessage.success("更新成功")
        await getallcunstomer()
    } catch (error) {
        console.log(error)
        ElMessage.error("更新失败")
    }
}



</script>

<style scoped>
::v-deep(.el-form-item__label) {
    color: #adff2f;
    /* 标签颜色 */
}
</style>