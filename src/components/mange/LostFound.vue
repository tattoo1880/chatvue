<template>

    <div>
        <el-row class='row-bg' justify='center'>
            <el-text class='mx-1' type='primary' size='large'>
                <h2 style="color: #adff2f">预约管理</h2>
            </el-text>
        </el-row>
    </div>

    <div>
        <el-row class='row-bg' justify='end'>
            <el-col :span='2'>
                <el-button type='success' plain @click='addlost'>发布失物招领</el-button>
            </el-col>
        </el-row>
    </div>

    <!-- table -->
    <div>
        <el-row class="row-bg" justify="center" style="margin-top: 30px;">
            <el-col :span="24">
                <el-table :data="tabledata" style="width: 100%" align="center">
                    <el-table-column prop="id" label="ID" width="300" align="center">
                        <template v-slot="{ row }">
                            <el-tag type="success">{{ row.uuid }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="username" label="标题" width="200" align="center">
                        <template v-slot="{ row }">
                            <el-tag type="success">{{ row.title }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="username" label="内容" width="200" align="center">
                        <template v-slot="{ row }">
                            <el-tag type="success">{{ row.content }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="username" label="地址" width="200" align="center">
                        <template v-slot="{ row }">
                            <el-tag type="success">{{ row.address }}</el-tag>
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
                            <el-button type="primary" plain @click="handerupdate(row)">
                                更新
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


    <!-- 添加失物招领 -->

    <div>
        <el-dialog v-model="showme1" title="添加服务" width="500" :before-close="handleClose">

            <el-form :label-position="labelPosition" label-width="auto" :model="lost"
                style="max-width: 600px; margin-top: 23px;">
                <el-form-item label="标题" prop="title" class="itemxxx">
                    <el-input v-model="lost.title"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content" class="itemxxx">
                    <el-input v-model="lost.content"></el-input>
                </el-form-item>

                <el-form-item label="地址" prop="address" class="itemxxx">
                    <el-input v-model="lost.address"></el-input>
                </el-form-item>


                <el-form-item>
                    <el-button type="primary" @click="handleClose">取消</el-button>
                    <el-button type="primary" @click="handleOk">确定</el-button>
                </el-form-item>

            </el-form>
        </el-dialog>
    </div>
    <!-- 更新失物招领 -->

    <div>
        <el-dialog v-model="showme2" title="添加服务" width="500" :before-close="handleClose2">

            <el-form :label-position="labelPosition" label-width="auto" :model="updateLost"
                style="max-width: 600px; margin-top: 23px;">
                <el-form-item label="标题" prop="title" class="itemxxx">
                    <el-input v-model="updateLost.title"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content" class="itemxxx">
                    <el-input v-model="updateLost.content"></el-input>
                </el-form-item>

                <el-form-item label="地址" prop="address" class="itemxxx">
                    <el-input v-model="updateLost.address"></el-input>
                </el-form-item>


                <el-form-item>
                    <el-button type="primary" @click="handleClose2">取消</el-button>
                    <el-button type="primary" @click="handleOk2">确定</el-button>
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
                    <el-upload ref="uploadRef" class="upload-demo" action="http://localhost:8000/api/lostimage/"
                        :auto-upload="false" :data="{ uuid: uploadImage.uuid }" >
                        <template #trigger>
                            <el-button type="primary">select file</el-button>
                        </template>

                        <!-- <el-button class="ml-3" type="success" @click="submitUpload">
                            upload to server
                        </el-button> -->

                        <!-- <template #tip>
                            <div class="el-upload__tip">
                                jpg/png files with a size less than 500kb
                            </div>
                        </template> -->
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

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ref, reactive, onMounted } from 'vue'
import myfetch from '@/utils/myfetch'
import type { UploadInstance } from 'element-plus'

const showme1 = ref(false)
const handleClose = () => {
    showme1.value = false
}

const upload = (uuid) => {
    console.log(uuid)
    uploadImage.uuid = uuid
    showme3.value = true

}
const labelPosition = ref('left')
const lost = reactive({
    title: '',
    content: '',
    address: '',
})
const tabledata = ref([])
const getalllost = async () => {
    try {
        const res = await myfetch.get('lost/')
        console.log(res)
        tabledata.value = res.data
    } catch (error) {
        console.log(error)
    }
}



const addlost = () => {
    console.log('addlost')
    showme1.value = true
}

const handleOk = async () => {
    console.log(lost)
    showme1.value = false
    try {
        const res = await myfetch.post('lost/', lost)
        console.log(res)
        await getalllost()

    } catch (error) {
        console.log(error)
        ElMessage.error('添加失败')
    }
}

onMounted(async () => {
    await getalllost()
})

const handerdelete = async (uuid) => {
    try {
        const res = await myfetch.delete(`lost/${uuid}/`)
        console.log(res)
        await getalllost()
    } catch (error) {
        console.log(error)
    }
}

// 更新失物招领
const showme2 = ref(false)
const handleClose2 = () => {
    showme2.value = false
}
const updateLost = reactive({
    title: '',
    content: '',
    address: '',
    image: '',
})

const handleOk2 = async () => {
    console.log(updateLost)
}


const handerupdate = (row) => {
    console.log(row)
    showme2.value = true
    updateLost.title = row.title
    updateLost.content = row.content
    updateLost.address = row.address
    updateLost.image = row.image
}

// 上传图片
const showme3 = ref(false)
const handleClose3 = () => {
    showme3.value = false
}
const uploadImage = reactive({
    uuid: '',
})


const uploadRef = ref<UploadInstance>()


const submitUpload = async() => {
    console.log(uploadImage)
    console.log(uploadRef.value)
    uploadRef.value!.submit()
    showme3.value = false
    await getalllost()  
    window.location.reload()    
}

</script>

<style scoped>
::v-deep(.el-form-item__label) {
    color: #adff2f;
    /* 标签颜色 */
}
</style>