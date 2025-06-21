<template>

    < <div>
        <el-row class='row-bg' justify='center'>
            <el-text class='mx-1' type='primary' size='large'>
                <h2 style="color: #adff2f">维修管理</h2>
            </el-text>
        </el-row>
        </div>

        <div>
            <el-row class='row-bg' justify='end'>
                <el-col :span='2'>
                    <el-button type='success' plain @click='addrepair'>新增维修项目</el-button>
                </el-col>
            </el-row>
        </div>

        <!-- table -->
        <div>
            <el-row class="row-bg" justify="center" style="margin-top: 30px;">
                <el-col :span="24">
                    <el-table :data="tabledata" style="width: 100%" align="center">
                        <el-table-column prop="id" label="ID" width="250" align="center">
                            <template v-slot="{ row }">
                                <el-tag type="success">{{ row.uuid }}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="user_detail" label="保修用户" width="150" align="center">
                            <template v-slot="{ row }">
                                <el-tag type="success">{{ row.user_detail.name }}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="username" label="标题" width="100" align="center">
                            <template v-slot="{ row }">
                                <el-tag type="success">{{ row.title }}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="username" label="内容" width="200" align="center">
                            <template v-slot="{ row }">
                                <el-tag type="success">{{ row.content }}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="username" label="地址" width="100" align="center">
                            <template v-slot="{ row }">
                                <el-tag type="success">{{ row.point }}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="wishtime" label="期望时间" width="100" align="center">
                            <template v-slot="{ row }">
                                <el-tag type="success">{{ row.wish_time }}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="status" label="状态" width="100" align="center">
                            <template v-slot="{ row }">
                                <el-tag type="success">{{ row.status }}</el-tag>
                            </template>
                        </el-table-column>
                        <!-- 图片 -->
                        <el-table-column prop="username" label="图片" width="200" align="center">
                            <template v-slot="{ row }">
                                <el-image style="width: 100px; height: 100px" :src="row.image" fit="cover"></el-image>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="100" align="center">
                            <template v-slot="{ row }">
                                <el-button type="warning" plain @click="upload(row.uuid)">
                                    上传图片
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="100" align="center">
                            <template v-slot="{ row }">
                                <el-button type="primary" plain @click="handerupdate(row)"
                                    :disabled="row.status != '未处理'">
                                    确认
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="100" align="center">
                            <template v-slot="{ row }">

                                <el-button type="danger" plain @click="handerdelete(row.uuid)">
                                    删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </div>


        <!-- table end -->







        <!-- 新增维修dialog -->
        <div>
            <el-dialog v-model="showme1" title="添加服务" width="500" :before-close="handleClose">

                <el-form :label-position="labelPosition" label-width="auto" :model="repair"
                    style="max-width: 600px; margin-top: 23px;">
                    <!-- 选择维修用户 -->
                    <el-form-item label="维修用户" prop="user" class="itemxxx">
                        <el-select v-model="repair.user" placeholder="请选择">
                            <el-option v-for="item in userdetail" :key="item.uuid" :label="item.name"
                                :value="item.uuid">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="标题" prop="title" class="itemxxx">
                        <el-input v-model="repair.title"></el-input>
                    </el-form-item>
                    <el-form-item label="内容" prop="content" class="itemxxx">
                        <el-input v-model="repair.content"></el-input>
                    </el-form-item>

                    <el-form-item label="地址" prop="address" class="itemxxx">
                        <el-input v-model="repair.point"></el-input>
                    </el-form-item>

                    <!-- 选择时间 -->
                    <el-form-item label="预计维修时间" prop="wishtime" class="itemxxx">
                        <el-date-picker v-model="repair.wish_time" type="datetime" placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>


                    <el-form-item>
                        <el-button type="primary" @click="handleClose">取消</el-button>
                        <el-button type="primary" @click="handleOk">确定</el-button>
                    </el-form-item>

                </el-form>
            </el-dialog>
        </div>


        <!-- 上传图片的dialog -->
        <div>
            <el-dialog v-model="showme3" title="上传图片" width="500" :before-close="handleClose3">
                <el-form :label-position="labelPosition" label-width="auto" :model="uploadImage"
                    style="max-width: 600px; margin-top: 23px;">
                    <el-form-item label="图片" prop="image" class="itemxxx">
                        <el-upload ref="uploadRef" class="upload-demo" action="http://localhost:8000/api/repairimage/"
                            :auto-upload="false" :on-error="handleError" :data="{ uuid: uploadImage.uuid }">
                            <template #trigger>
                                <el-button type="primary">select file</el-button>
                            </template>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleClose3">取消</el-button>
                        <el-button type="primary" @click="submitUpload">确定</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import myfetch from '@/utils/myfetch'
import type { UploadInstance } from 'element-plus'

const userdetail = ref([])
const showme3 = ref(false)

const uploadImage = reactive({
    uuid: ''
})

const upload = (uuid) => {
    uploadImage.uuid = uuid
    showme3.value = true
}



//data 准备
const getalluser = async () => {
    try {
        const res = await myfetch.get('user/')
        console.log(res)
        userdetail.value = res.data
    } catch (error) {
        console.log(error)
    }
}

const tabledata = ref([])
const showme1 = ref(false)
const addrepair = () => {
    showme1.value = true
}
const repair = reactive({
    title: '',
    content: '',
    point: '',
    user: '',
    status: "未处理",
    wish_time: ''
})


// ====dialog add====
const labelPosition = ref('left')
const handleClose = () => {
    showme1.value = false
}

const handleOk = async () => {
    console.log(repair)
    try {
        const res = await myfetch.post('repair/', repair)
        console.log(res)
        showme1.value = false
        await getallrepair()
    } catch (error) {
        console.log(error)
    }
}

// ====

const handleError = (error) => {
    console.log(error)
}


const getallrepair = async () => {
    try {
        const res = await myfetch.get('repair/')
        console.log(res)
        tabledata.value = res.data
    } catch (error) {
        console.log(error)
    }
}


//upload image
const uploadRef = ref<UploadInstance>()


const submitUpload = async () => {
    console.log(uploadImage)
    console.log(uploadRef.value)
    uploadRef.value!.submit()
    showme3.value = false
    await getallrepair()
    window.location.reload()
}

const handleClose3 = () => {
    showme3.value = false
}



onMounted(async () => {
    await getallrepair()
    await getalluser()
})


const handerupdate = async (row) => {
    console.log(row)
    try {
        const res = await myfetch.post(
            `confirmrepair/`,
            {
                uuid: row.uuid,
            }
        )
        console.log(res)
        await getallrepair()
    } catch (error) {
        console.log(error)
    }
}
const handerdelete = async (uuid) => {
    try {
        const res = await myfetch.delete(`repair/${uuid}/`)
        console.log(res)
        await getallrepair()
    } catch (error) {
        console.log(error)
    }
}
</script>

<style scoped>
::v-deep(.el-form-item__label) {
    color: #adff2f;
    /* 标签颜色 */
}
</style>