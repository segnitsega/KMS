import { Search, Bell, Filter, Download, Eye, Plus, User, Calendar, DownloadIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const documents = [
  {
    id: 1,
    title: "Employee Onboarding Guide",
    author: "Sarah Johnson",
    date: "2024-01-15",
    downloads: 45,
    version: "v2",
    tags: ["onboarding", "HR", "guide"],
    department: "HR",
    departmentColor: "bg-blue-100 text-blue-800",
  },
  {
    id: 2,
    title: "API Documentation Standards",
    author: "Michael Chen",
    date: "2024-01-10",
    downloads: 32,
    version: "v1",
    tags: ["API", "documentation", "standards"],
    department: "Engineering",
    departmentColor: "bg-purple-100 text-purple-800",
  },
  {
    id: 2,
    title: "API Documentation Standards",
    author: "Michael Chen",
    date: "2024-01-10",
    downloads: 32,
    version: "v1",
    tags: ["API", "documentation", "standards"],
    department: "Engineering",
    departmentColor: "bg-purple-100 text-purple-800",
  },
{
    id: 2,
    title: "API Documentation Standards",
    author: "Michael Chen",
    date: "2024-01-10",
    downloads: 32,
    version: "v1",
    tags: ["API", "documentation", "standards"],
    department: "Engineering",
    departmentColor: "bg-purple-100 text-purple-800",
  },
{
    id: 3,
    title: "API Documentation Standards",
    author: "Michael Chen",
    date: "2024-01-10",
    downloads: 32,
    version: "v1",
    tags: ["API", "documentation", "standards"],
    department: "Engineering",
    departmentColor: "bg-purple-100 text-purple-800",
  },
]

export function DocumentManagement() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search knowledge base, documents, people..."
                className="pl-10 bg-gray-50 border-gray-200"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5 text-gray-600" />
            </Button>

            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="font-semibold text-gray-900">Emily Rodriguez</div>
                <div className="flex items-center space-x-2 text-sm">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    employee
                  </Badge>
                  <span className="text-gray-600">Marketing</span>
                </div>
              </div>
              <Avatar>
                <AvatarFallback className="bg-gray-200">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Documents</h1>
            <p className="text-gray-600">Manage and share organizational documents</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search documents..." className="pl-10" />
            </div>
          </div>

          <Select defaultValue="all">
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="hr">HR</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Document Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <Card key={doc.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                {/* Document Icon and Version */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-8 bg-blue-600 rounded-sm flex items-center justify-center">
                      <div className="w-4 h-1 bg-white rounded-full mb-1"></div>
                      <div className="w-3 h-1 bg-white rounded-full mb-1"></div>
                      <div className="w-4 h-1 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {doc.version}
                  </Badge>
                </div>

                {/* Document Title */}
                <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2">{doc.title}</h3>

                {/* Author and Date */}
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <User className="h-4 w-4 mr-1" />
                  <span>{doc.author}</span>
                </div>

                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{doc.date}</span>
                </div>

                {/* Downloads */}
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <DownloadIcon className="h-4 w-4 mr-1" />
                  <span>{doc.downloads} downloads</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {doc.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Department Badge */}
                <div className="mb-4">
                  <Badge className={doc.departmentColor}>{doc.department}</Badge>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Windows Activation Notice */}
        <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg p-4 shadow-lg max-w-sm">
          <div className="text-sm text-gray-600 mb-2">Activate Windows</div>
          <div className="text-xs text-gray-500">Go to Settings to activate Windows</div>
        </div>
      </main>
    </div>
  )
}
